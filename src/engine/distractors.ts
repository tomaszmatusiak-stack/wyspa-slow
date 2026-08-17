import type { Dialog, Sentence, Tier, Word } from '../types'
import { pick, sample, shuffle, shuffleDifferent } from './random'

/**
 * Dobór błędnych odpowiedzi decyduje o tym, czy dziecko się uczy, czy zgaduje.
 * Zasada: dystraktor zawsze z tej samej kategorii semantycznej.
 * "dog → cat, horse" uczy. "dog → blue, run, table" uczy tylko eliminowania bzdur.
 */
export function wordDistractors(target: Word, pool: readonly Word[], count: number): Word[] {
  const notTarget = pool.filter((w) => w.id !== target.id)

  const sameCategory = notTarget.filter((w) => w.category === target.category)
  const sameWorld = notTarget.filter((w) => w.category !== target.category && w.worldId === target.worldId)
  const rest = notTarget.filter((w) => w.category !== target.category && w.worldId !== target.worldId)

  const out: Word[] = []
  for (const bucket of [sameCategory, sameWorld, rest]) {
    if (out.length >= count) break
    out.push(...sample(bucket, count - out.length))
  }
  return out
}

export function quizOptions(target: Word, pool: readonly Word[], count: number): Word[] {
  return shuffle([target, ...wordDistractors(target, pool, count - 1)])
}

/** Litery, które polskie dziecko myli przy zapisie angielskiego. */
const CONFUSABLE: Record<string, string[]> = {
  c: ['k', 's'],
  k: ['c'],
  s: ['z', 'c'],
  z: ['s'],
  f: ['v', 'p'],
  v: ['f', 'w'],
  w: ['v'],
  i: ['y', 'e'],
  y: ['i', 'j'],
  j: ['y', 'g'],
  o: ['u', 'a'],
  u: ['o', 'a'],
  e: ['a', 'i'],
  a: ['e', 'o'],
  h: ['ch'],
  g: ['j'],
  t: ['d'],
  d: ['t'],
  b: ['p'],
  p: ['b'],
}

const ALPHABET = 'abcdefghijklmnoprstuwy'.split('')

/**
 * Kafelki liter do literowania. T1 — dokładnie litery słowa.
 * T2 — plus 2–3 litery-pułapki (najpierw te mylone, potem losowe spoza słowa).
 */
export function letterTiles(word: string, tier: Tier): string[] {
  const letters = word.toLowerCase().replace(/[^a-z]/g, '').split('')
  if (tier <= 1) return shuffleDifferent(letters)

  const extraCount = tier === 2 ? 2 : 3
  const inWord = new Set(letters)
  const candidates = new Set<string>()

  for (const l of letters) {
    for (const c of CONFUSABLE[l] ?? []) {
      if (c.length === 1 && !inWord.has(c)) candidates.add(c)
    }
  }
  for (const l of ALPHABET) {
    if (candidates.size >= extraCount * 3) break
    if (!inWord.has(l)) candidates.add(l)
  }

  return shuffleDifferent([...letters, ...sample([...candidates], extraCount)])
}

/**
 * Klocki do układania zdania. Liczba pułapek rośnie z tierem;
 * w T1 dziecko dostaje dokładnie to, czego potrzebuje.
 */
export function sentencePool(sentence: Sentence, tier: Tier): string[] {
  const extras = tier === 1 ? 0 : tier === 2 ? 2 : sentence.distractors.length
  return shuffleDifferent([...sentence.tokens, ...sentence.distractors.slice(0, extras)])
}

/** Słówka funkcyjne, na których polskie dzieci najczęściej się przewracają. */
const GRAMMAR_TOKENS = new Set([
  'is', 'are', 'am', 'a', 'an', 'the', 'my', 'your', 'his', 'her',
  'do', "don't", 'does', 'can', "can't", 'in', 'on', 'and', 'to', 'not', 'like', 'likes',
])

const FILLER_TOKENS = ['is', 'are', 'am', 'a', 'an', 'the', 'my', 'your', 'do', 'can', "can't", 'in', 'on', 'and']

const clean = (t: string) => t.toLowerCase().replace(/[^a-z']/g, '')

/**
 * Luka trafia w słowo funkcyjne, jeśli takie w zdaniu jest —
 * „The dog ___ big" uczy więcej niż „The ___ is big".
 */
export function pickGapIndex(sentence: Sentence): number {
  const candidates = sentence.tokens
    .map((t, i) => ({ t, i }))
    .filter(({ t, i }) => i > 0 && GRAMMAR_TOKENS.has(clean(t)))
  if (candidates.length) return pick(candidates).i
  return sentence.tokens.length > 1 ? 1 + Math.floor(Math.random() * (sentence.tokens.length - 1)) : 0
}

export function gapOptions(sentence: Sentence, gapIndex: number): string[] {
  const correct = sentence.tokens[gapIndex]
  const taken = new Set(sentence.tokens.map(clean))
  const candidates = [
    ...sentence.distractors,
    ...FILLER_TOKENS.filter((t) => !taken.has(clean(t))),
  ].filter((t) => clean(t) !== clean(correct))

  return shuffle([correct, ...sample([...new Set(candidates)], 2)])
}

/** Warianty brakującej kwestii w dialogu — pozostałe linie tej samej osoby brzmią wiarygodnie. */
export function dialogOptions(dialog: Dialog, hiddenIndex: number, allDialogs: readonly Dialog[]): string[] {
  const correct = dialog.lines[hiddenIndex]
  const sameSpeaker = dialog.lines.filter((l, i) => i !== hiddenIndex && l.who === correct.who)
  const foreign = allDialogs
    .filter((d) => d.id !== dialog.id)
    .flatMap((d) => d.lines)
    .filter((l) => l.who === correct.who)

  const wrong = [...sample(sameSpeaker, 1), ...sample(foreign, 2)].slice(0, 2)
  while (wrong.length < 2 && foreign.length) wrong.push(pick(foreign))

  return shuffle([correct.en, ...wrong.map((l) => l.en)])
}
