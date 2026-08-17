import type { Tense, Verb, Word } from '../types'
import { TENSE_LABEL } from '../content/verbs'
import { pick, sample, shuffle } from './random'

/**
 * Generator zdań z tabeli odmian. Z jednego czasownika wychodzi kilkanaście
 * poprawnych, celowanych zadań — dlatego 64 czasowniki dają realną objętość
 * ćwiczeń gramatycznych bez pisania każdego zdania osobno.
 */

interface Subject {
  en: string
  /** he / she / it — wymaga formy z „-s". */
  third: boolean
}

const SUBJECTS: Subject[] = [
  { en: 'I', third: false },
  { en: 'You', third: false },
  { en: 'We', third: false },
  { en: 'They', third: false },
  { en: 'He', third: true },
  { en: 'She', third: true },
  { en: 'My brother', third: true },
  { en: 'My sister', third: true },
  { en: 'The teacher', third: true },
]

/** „am / is / are" do czasu present continuous. */
function beFor(subject: Subject): string {
  if (subject.en === 'I') return 'am'
  return subject.third ? 'is' : 'are'
}

export interface Drill {
  /** Zdanie z „___" w miejscu luki. */
  prompt: string
  /** Pełne, poprawne zdanie — do odczytania przez lektora. */
  full: string
  answer: string
  options: string[]
  tense: Tense
  subject: string
}

const withComplement = (verb: Verb) => (verb.complement ? ` ${verb.complement}` : '')

/** Podmioty dopuszczalne dla danego czasownika — „My leg hurts", nie „He hurts". */
export function subjectsFor(verb: Verb): Subject[] {
  if (!verb.subjects) return SUBJECTS
  return verb.subjects.map((en) => ({ en, third: true }))
}

/** Czasy, w których dany czasownik brzmi poprawnie. */
export function tensesForVerb(verb: Verb, allowed: Tense[]): Tense[] {
  return verb.stative ? allowed.filter((t) => t !== 'continuous') : allowed
}

/** Zdanie w danym czasie, z luką na formę czasownika. */
export function makeDrill(verb: Verb, tense: Tense, subject = pick(subjectsFor(verb))): Drill {
  // „He lives in Poland every day" brzmi źle — część czasowników nie bierze markera.
  const marker = tense === 'present' && verb.noPresentMarker ? '' : TENSE_LABEL[tense].marker
  const tail = `${withComplement(verb)}${marker ? ` ${marker}` : ''}.`

  let head: string
  let answer: string
  switch (tense) {
    case 'present':
      head = subject.en
      answer = subject.third ? verb.third : verb.base
      break
    case 'continuous':
      // Czasownik „be" podajemy — luka izoluje jedną rzecz: formę z „-ing".
      head = `${subject.en} ${beFor(subject)}`
      answer = verb.ing
      break
    case 'past':
      head = subject.en
      answer = verb.past
      break
  }

  // Dystraktory to pozostałe formy TEGO SAMEGO czasownika — dokładnie te,
  // które dziecko myli. Losowe słowa uczyłyby tylko eliminowania bzdur.
  const forms = [verb.base, verb.third, verb.ing, verb.past]
  const wrong = sample([...new Set(forms.filter((f) => f !== answer))], 2)

  return {
    prompt: `${head} ___${tail}`,
    full: `${head} ${answer}${tail}`,
    answer,
    options: shuffle([answer, ...wrong]),
    tense,
    subject: subject.en,
  }
}

/**
 * Trzy zdania tego samego czasownika, każde w innym czasie —
 * materiał do sortowania „kiedy to się dzieje?".
 */
export function makeTenseTriplet(verb: Verb): { sentence: string; tense: Tense }[] {
  const subject = pick(subjectsFor(verb).filter((s) => s.third))
  // Bez markera nie da się rozpoznać czasu — takie czasowniki wypadają z sortowania.
  if (verb.noPresentMarker) return []
  return tensesForVerb(verb, ['present', 'continuous', 'past']).map((tense) => ({
    sentence: makeDrill(verb, tense, subject).full,
    tense,
  }))
}

/** Pula kafelków do tabelki odmiany: trzy poprawne formy plus formy obcych czasowników. */
export function makeTablePool(verb: Verb, others: Verb[]): string[] {
  const correct = [verb.third, verb.ing, verb.past]
  const noise = sample(
    others
      .filter((o) => o.wordId !== verb.wordId)
      .flatMap((o) => [o.third, o.ing, o.past])
      .filter((f) => !correct.includes(f)),
    3,
  )
  return shuffle([...correct, ...noise])
}

/** Czy czasownik da się sensownie odmienić w ćwiczeniu (np. „read" ma past = „read"). */
export function isDrillable(verb: Verb): boolean {
  return new Set([verb.base, verb.third, verb.ing, verb.past]).size >= 3
}

/** Pomocnik dla lessonBuildera — czasowniki dostępne dla danego zestawu słów. */
export function verbsForWords(words: Word[], byWordId: Map<string, Verb>): Verb[] {
  return words
    .map((w) => byWordId.get(w.id))
    .filter((v): v is Verb => !!v && isDrillable(v))
}
