import type { ItemProgress, Lesson, Task, Tense, Tier, Verb, Word, WordCategory } from '../types'
import { CATEGORY_LABEL, NUMBER_WORDS, WORDS, getWord } from '../content/words'
import { VERB_BY_WORD } from '../content/verbs'
import {
  makeDrill,
  makeTablePool,
  makeTenseTriplet,
  tensesForVerb,
  verbsForWords,
} from './verbDrills'
import { getSentence } from '../content/sentences'
import { DIALOGS, DIALOG_BY_ID } from '../content/dialogs'
import { ALL_LESSONS, lessonIndex } from '../content/worlds'
import { optionCount, tierFor } from './difficulty'
import {
  dialogOptions,
  gapOptions,
  letterTiles,
  pickGapIndex,
  quizOptions,
  sentencePool,
} from './distractors'
import { isDue } from './srs'
import { pick, sample, shuffle } from './random'

/**
 * 15 zadań na rundę × 4 rundy = 60 zadań dziennie.
 * Zadania „długie" (memory, łączenie, sortowanie, układanie zdań) zajmują po ~minucie,
 * krótkie po ~20 sekund — razem wychodzi dzienne 40–45 minut z planu.
 */
const ROUND_SIZE = 15

/** Ile słów musi mieć runda, żeby dało się z nich ułożyć ciekawe zadania. */
const MIN_FOCUS = 6

export interface BuildContext {
  lesson: Lesson
  progress: Map<string, ItemProgress>
  maxTier: Tier
  now: number
}

let seq = 0
const key = (kind: string) => `${kind}#${seq++}`

// ——————————————————————————————————————————— przygotowanie materiału

interface Material {
  focus: Word[]
  /** Elementy należne dziś wg SRS. */
  review: Word[]
  /**
   * Materiał do rundy „Mistrz". Pierwszego dnia nic nie jest jeszcze należne wg SRS,
   * więc dobieramy wcześniej poznane słowa — inaczej ostatnia runda byłaby samym wypełniaczem.
   */
  recap: Word[]
  pool: Word[]
  known: Word[]
  numbersKnown: boolean
  /** Czasowniki z odmianą dostępne w tej lekcji (nowe + wcześniej poznane). */
  verbs: Verb[]
  /** Czasowniki wprowadzone właśnie teraz — one dostają tabelkę odmiany. */
  newVerbs: Verb[]
  tier: (w: Word) => Tier
  ctx: BuildContext
}

function prepare(ctx: BuildContext): Material {
  const { lesson, progress, maxTier } = ctx
  const idx = lessonIndex(lesson.id)

  const knownIds = new Set(
    ALL_LESSONS.filter((l) => lessonIndex(l.id) <= idx).flatMap((l) => l.newWords),
  )
  const known = WORDS.filter((w) => knownIds.has(w.id))
  const sameWorld = WORDS.filter((w) => w.worldId === lesson.worldId)
  const pool = known.length >= 8 ? known : sameWorld.length >= 8 ? sameWorld : WORDS

  // Krótkie lekcje (np. 2 nowe zwroty) uzupełniamy najświeższymi znanymi słowami,
  // żeby każda runda miała z czego budować zadania.
  const newWords = lesson.newWords.map(getWord)
  const filler = known
    .filter((w) => !lesson.newWords.includes(w.id))
    .slice(-Math.max(0, MIN_FOCUS - newWords.length) - 2)
  const focus = newWords.length >= MIN_FOCUS ? newWords : [...newWords, ...filler]

  const review = known
    .filter((w) => !lesson.newWords.includes(w.id) && isDue(progress.get(w.id), ctx.now))
    .sort((a, b) => (progress.get(a.id)?.dueAt ?? 0) - (progress.get(b.id)?.dueAt ?? 0))
    .slice(0, 6)

  const older = known.filter(
    (w) => !lesson.newWords.includes(w.id) && !review.some((r) => r.id === w.id),
  )
  const recap = [...review, ...sample(older, Math.max(0, 6 - review.length))]

  return {
    focus,
    review,
    recap,
    pool,
    known,
    numbersKnown: knownIds.has('numbers.10'),
    verbs: verbsForWords(known, VERB_BY_WORD),
    newVerbs: verbsForWords(newWords, VERB_BY_WORD),
    tier: (w) => tierFor(progress.get(w.id), maxTier),
    ctx,
  }
}

// ——————————————————————————————————————————— generatory pojedynczych zadań

function listenPick(m: Material, w: Word): Task {
  return {
    key: key('lp'),
    kind: 'listenPick',
    tier: 1,
    itemIds: [w.id],
    isReview: false,
    word: w,
    options: quizOptions(w, m.pool, 3),
  }
}

function quiz(
  m: Material,
  w: Word,
  mode: 'pic2word' | 'word2pic' | 'pl2word',
  isReview = false,
): Task {
  const t = m.tier(w)
  // Fraza nie da się odgadnąć z samego emoji — pytamy przez polski.
  const safeMode = w.kind === 'phrase' && mode !== 'pl2word' ? 'pl2word' : mode
  return {
    key: key('pq'),
    kind: 'pictureQuiz',
    tier: t,
    itemIds: [w.id],
    isReview,
    word: w,
    options: quizOptions(w, m.pool, optionCount(t)),
    mode: safeMode,
  }
}

function memory(m: Material, words: Word[], variant: 'pic-en' | 'en-pl'): Task | null {
  const usable = words.filter((w) => w.kind === 'word')
  if (usable.length < 3) return null
  const picked = sample(usable, Math.min(m.ctx.maxTier >= 3 ? 5 : 4, usable.length))
  return {
    key: key('mem'),
    kind: 'memory',
    tier: m.ctx.maxTier,
    itemIds: picked.map((w) => w.id),
    isReview: false,
    words: picked,
    variant,
  }
}

function match(words: Word[], variant: 'pic-en' | 'en-pl'): Task | null {
  const usable = variant === 'pic-en' ? words.filter((w) => w.kind === 'word') : words
  if (usable.length < 3) return null
  const picked = sample(usable, Math.min(5, usable.length))
  return {
    key: key('mt'),
    kind: 'match',
    tier: variant === 'en-pl' ? 2 : 1,
    itemIds: picked.map((w) => w.id),
    isReview: false,
    pairs: picked,
    variant,
  }
}

function sentence(m: Material, id: string): Task {
  const s = getSentence(id)
  const t = tierFor(m.ctx.progress.get(s.id), m.ctx.maxTier)
  return {
    key: key('sen'),
    kind: 'sentence',
    tier: t,
    itemIds: [s.id],
    isReview: false,
    sentence: s,
    pool: sentencePool(s, t),
    showHint: t === 1,
  }
}

function fillGap(m: Material, id: string): Task {
  const s = getSentence(id)
  const gapIndex = pickGapIndex(s)
  return {
    key: key('fg'),
    kind: 'fillGap',
    tier: Math.min(2, m.ctx.maxTier) as Tier,
    itemIds: [s.id],
    isReview: false,
    sentence: s,
    gapIndex,
    options: gapOptions(s, gapIndex),
  }
}

function spelling(m: Material, w: Word): Task | null {
  if (w.kind !== 'word' || w.en.replace(/[^a-zA-Z]/g, '').length > 10) return null
  const t = m.tier(w)
  const mode = t >= 3 ? 'keyboard' : 'tiles'
  return {
    key: key('sp'),
    kind: 'spelling',
    tier: t,
    itemIds: [w.id],
    isReview: false,
    word: w,
    letters: mode === 'tiles' ? letterTiles(w.en, t) : [],
    mode,
  }
}

function oddOneOut(m: Material): Task | null {
  const byCategory = new Map<WordCategory, Word[]>()
  for (const w of [...m.focus, ...m.known]) {
    const list = byCategory.get(w.category) ?? []
    if (!list.some((x) => x.id === w.id)) list.push(w)
    byCategory.set(w.category, list)
  }
  const focusCategories = [...new Set(m.focus.map((w) => w.category))]
  const main = focusCategories.filter((c) => (byCategory.get(c)?.length ?? 0) >= 3)
  const others = [...byCategory.keys()].filter((c) => !focusCategories.includes(c))
  if (!main.length || !others.length) return null

  const category = pick(main)
  const three = sample(byCategory.get(category)!, 3)
  const odd = pick(sample(byCategory.get(pick(others))!, 1))

  return {
    key: key('odd'),
    kind: 'oddOne',
    tier: 2,
    itemIds: [odd.id],
    isReview: false,
    items: shuffle([...three, odd]),
    oddId: odd.id,
    categoryLabel: CATEGORY_LABEL[category].pl,
  }
}

function sorting(m: Material): Task | null {
  const source = [...m.focus, ...m.recap]
  const categories = [...new Set(source.map((w) => w.category))]
  const usable = categories.filter((c) => source.filter((w) => w.category === c).length >= 2)
  if (usable.length < 2) return null

  const chosen = sample(usable, Math.min(3, usable.length))
  const buckets = chosen.map((c) => ({
    key: c,
    label: CATEGORY_LABEL[c].pl,
    icon: CATEGORY_LABEL[c].icon,
  }))
  const items = shuffle(
    chosen.flatMap((c) =>
      sample(source.filter((w) => w.category === c), 3).map((w) => ({ word: w, bucketKey: c })),
    ),
  ).slice(0, 8)

  return {
    key: key('sort'),
    kind: 'sorting',
    tier: 2,
    itemIds: items.map((i) => i.word.id),
    isReview: false,
    buckets,
    items,
  }
}

function bubbles(m: Material): Task | null {
  const categories = [...new Set(m.focus.map((w) => w.category))]
  const target = categories.find(
    (c) => m.known.filter((w) => w.category === c).length >= 3,
  )
  if (!target) return null

  const hits = sample(m.known.filter((w) => w.category === target), 4)
  const misses = sample(m.known.filter((w) => w.category !== target), 5)
  if (hits.length < 3 || misses.length < 3) return null

  return {
    key: key('bub'),
    kind: 'bubbles',
    tier: 2,
    itemIds: hits.map((w) => w.id),
    isReview: false,
    label: CATEGORY_LABEL[target].pl.toUpperCase(),
    items: shuffle([...hits, ...misses]),
    targetIds: hits.map((w) => w.id),
  }
}

function math(m: Material): Task | null {
  if (!m.numbersKnown) return null
  const op = pick(['+', '−'] as const)
  let a: number
  let b: number
  if (op === '+') {
    a = 1 + Math.floor(Math.random() * 9)
    b = 1 + Math.floor(Math.random() * (10 - a))
  } else {
    a = 3 + Math.floor(Math.random() * 8)
    b = 1 + Math.floor(Math.random() * (a - 1))
  }
  const result = op === '+' ? a + b : a - b
  const answer = NUMBER_WORDS[result - 1]
  const wrong = sample(
    NUMBER_WORDS.slice(0, 12).filter((w) => w !== answer),
    3,
  )
  return {
    key: key('math'),
    kind: 'math',
    tier: 2,
    itemIds: [`numbers.${result}`],
    isReview: false,
    a,
    b,
    op,
    options: shuffle([answer, ...wrong]),
    answer,
  }
}

// ——— zadania z odmian czasowników (treść generowana, nie pisana z ręki)

function verbForm(m: Material, verb: Verb, tense: Tense): Task {
  const drill = makeDrill(verb, tense)
  return {
    key: key('vf'),
    kind: 'verbForm',
    tier: Math.min(2, m.ctx.maxTier) as Tier,
    // Postęp liczymy na parze czasownik+czas, żeby SRS pilnował każdego czasu osobno.
    itemIds: [`${verb.wordId}#${tense}`],
    isReview: false,
    verb,
    word: getWord(verb.wordId),
    tense,
    prompt: drill.prompt,
    answer: drill.answer,
    options: drill.options,
  }
}

function verbTable(m: Material, verb: Verb): Task {
  return {
    key: key('vt'),
    kind: 'verbTable',
    tier: Math.min(2, m.ctx.maxTier) as Tier,
    itemIds: [`${verb.wordId}#forms`],
    isReview: false,
    verb,
    word: getWord(verb.wordId),
    pool: makeTablePool(verb, m.verbs),
  }
}

function tenseSort(m: Material): Task | null {
  const usable = m.verbs.filter((v) => !v.noPresentMarker && !v.stative)
  if (usable.length < 2) return null
  const chosen = sample(usable, 2)
  const items = shuffle(chosen.flatMap(makeTenseTriplet)).slice(0, 5)
  if (items.length < 3) return null
  return {
    key: key('ts'),
    kind: 'tenseSort',
    tier: 2,
    itemIds: chosen.map((v) => `${v.wordId}#tense`),
    isReview: false,
    items,
  }
}

/** Ta sama rozmowa, druga forma ćwiczenia — bez ani jednego nowego zdania. */
function dialogOrder(m: Material): Task | null {
  const dialog = m.ctx.lesson.dialogId ? DIALOG_BY_ID.get(m.ctx.lesson.dialogId) : undefined
  if (!dialog || dialog.lines.length < 4) return null
  return {
    key: key('dord'),
    kind: 'dialogOrder',
    tier: Math.min(2, m.ctx.maxTier) as Tier,
    itemIds: [`${dialog.id}#order`],
    isReview: false,
    dialog,
    shuffled: shuffle(dialog.lines.map((_, i) => i).filter((i) => i > 0)),
  }
}

function dialogTasks(m: Material, count: number): Task[] {
  const dialog = m.ctx.lesson.dialogId ? DIALOG_BY_ID.get(m.ctx.lesson.dialogId) : undefined
  if (!dialog) return []
  // Warianty tylko z rozmów z tygodni już poznanych.
  const scoped = DIALOGS.filter((d) => d.worldId <= m.ctx.lesson.worldId)
  return shuffle(dialog.lines.map((_, i) => i))
    .filter((i) => i > 0)
    .slice(0, count)
    .map((hiddenIndex) => ({
      key: key('dlg'),
      kind: 'dialog',
      tier: Math.min(2, m.ctx.maxTier) as Tier,
      itemIds: [`${dialog.id}.${hiddenIndex}`],
      isReview: false,
      dialog,
      hiddenIndex,
      options: dialogOptions(dialog, hiddenIndex, scoped, DIALOGS),
    }))
}

// ——————————————————————————————————————————— rundy

/**
 * Runda 0 „Poznaj"  — pierwszy kontakt: słuchanie, rozpoznawanie, łączenie w pary.
 * Runda 1 „Ćwicz"   — przypominanie bez obrazka, literowanie, gry na kategorie.
 * Runda 2 „Zdania"  — układanie zdań, luki, dialog.
 * Runda 3 „Mistrz"  — sortowanie, memory, powtórki SRS, działania po angielsku.
 */
export function buildRound(round: number, ctx: BuildContext): Task[] {
  const m = prepare(ctx)
  const plan = ROUND_BUILDERS[round]?.(m) ?? []
  return padTo(plan.filter((t): t is Task => t !== null), ROUND_SIZE, m).slice(0, ROUND_SIZE)
}

type RoundBuilder = (m: Material) => (Task | null)[]

const ROUND_BUILDERS: RoundBuilder[] = [
  // ——— Poznaj
  (m) => {
    const intro = m.focus.map((w) => listenPick(m, w))
    const recog = m.focus.map((w) => quiz(m, w, 'pic2word'))
    const out: (Task | null)[] = interleave([intro, recog])
    out.splice(Math.min(5, out.length), 0, match(m.focus, 'pic-en'))
    return out
  },

  // ——— Ćwicz
  (m) => {
    const recall = m.focus.map((w) => quiz(m, w, 'pl2word'))
    const spell = m.focus.map((w) => spelling(m, w)).filter(Boolean) as Task[]
    const games = [oddOneOut(m), bubbles(m), memory(m, m.focus, 'pic-en')].filter(Boolean) as Task[]
    // Nowy czasownik dostaje tabelkę odmiany od razu, w rundzie utrwalania.
    const tables = m.newVerbs.slice(0, 2).map((v) => verbTable(m, v))
    const out: (Task | null)[] = interleave([recall, spell, tables])
    games.forEach((g, i) => out.splice(Math.min(3 + i * 4, out.length), 0, g))
    return out
  },

  // ——— Zdania
  (m) => {
    const ids = m.ctx.lesson.sentences
    const builders = ids.map((id) => sentence(m, id))
    const gaps = ids.map((id) => fillGap(m, id))
    const allowed = tensesFor(m.ctx.lesson.worldId)
    // Z jednego czasownika robimy tyle zadań, ile czasów już znamy —
    // pomijając te, w których dany czasownik nie występuje (np. „I am knowing").
    const forms = (m.newVerbs.length ? m.newVerbs : m.verbs.slice(-3)).flatMap((v) =>
      tensesForVerb(v, allowed).map((t) => verbForm(m, v, t)),
    )
    // Dialog rezerwuje sobie miejsce z góry. Doklejony na końcu wypadał z rundy
    // w lekcjach, które mają dużo zdań i czasowników.
    const dialogs = dialogTasks(m, 3)
    const body = interleave([builders, gaps, forms])
    return [...body.slice(0, Math.max(0, ROUND_SIZE - dialogs.length)), ...dialogs]
  },

  // ——— Mistrz
  (m) => {
    const reviews = m.recap.map((w) => quiz(m, w, m.tier(w) === 1 ? 'pic2word' : 'pl2word', true))
    const drills = m.focus.map((w) => quiz(m, w, 'word2pic'))
    const tenses = tensesFor(m.ctx.lesson.worldId)
    const forms = sample(m.verbs, 3).flatMap((v) =>
      tensesForVerb(v, tenses).map((t) => verbForm(m, v, t)),
    )
    return [
      match([...m.focus, ...m.recap], 'en-pl'),
      ...interleave([reviews, drills]).slice(0, 4),
      sorting(m),
      // Sortowanie po czasach ma sens dopiero, gdy dziecko zna więcej niż jeden czas.
      tenses.length > 1 ? tenseSort(m) : null,
      memory(m, [...m.focus, ...m.recap], m.ctx.maxTier >= 3 ? 'en-pl' : 'pic-en'),
      math(m),
      ...interleave([reviews.slice(2), drills.slice(2), forms]).slice(0, 4),
      bubbles(m),
      // Finał dnia: cała rozmowa do ułożenia po kolei.
      dialogOrder(m),
    ]
  },
]

/**
 * Czasy wprowadzamy stopniowo: najpierw present simple, potem continuous, na końcu past.
 * Bez tego dziecko dostawałoby trzy czasy naraz w tygodniu, w którym dopiero poznaje
 * pierwsze czasowniki.
 */
function tensesFor(worldId: number): Tense[] {
  const out: Tense[] = ['present']
  if (worldId >= 6) out.push('continuous')
  if (worldId >= 9) out.push('past')
  return out
}

/** Dopycha rundę mieszanymi quizami, żeby nawet lekcja z dwoma zwrotami trwała pełne 11 minut. */
function padTo(tasks: Task[], target: number, m: Material): Task[] {
  if (tasks.length >= target) return tasks
  const candidates = shuffle([...m.focus, ...m.recap, ...m.known.slice(-12)])
  const modes = ['pl2word', 'word2pic', 'pic2word'] as const
  const out = [...tasks]
  let i = 0
  while (out.length < target && candidates.length) {
    out.push(quiz(m, candidates[i % candidates.length], modes[i % modes.length]))
    i++
  }
  return out
}

/** Round-robin po niepustych listach — trzyma typy zadań w rotacji. */
function interleave<T>(lists: T[][]): T[] {
  const out: T[] = []
  const queues = lists.map((l) => l.slice())
  let progressed = true
  while (progressed) {
    progressed = false
    for (const q of queues) {
      const item = q.shift()
      if (item !== undefined) {
        out.push(item)
        progressed = true
      }
    }
  }
  return out
}
