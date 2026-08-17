/** Typy współdzielone przez content, silnik i UI. */

export type Tier = 1 | 2 | 3
export type Box = 0 | 1 | 2 | 3 | 4 | 5

export type WordCategory =
  | 'greetings'
  | 'family'
  | 'numbers'
  | 'rooms'
  | 'objects'
  | 'food'
  | 'likes'
  | 'football'
  | 'verbs'
  | 'ability'
  | 'weather'
  | 'colors'
  | 'clothes'
  | 'places'
  | 'shopping'

export interface Word {
  id: string
  en: string
  pl: string
  /** Emoji albo krótki ciąg emoji. Jedyne miejsce, które zmieni się przy migracji na OpenMoji. */
  asset: string
  category: WordCategory
  worldId: number
  /** Frazy nie nadają się do literowania ani do „wpisz z klawiatury". */
  kind: 'word' | 'phrase'
}

export interface Sentence {
  id: string
  en: string
  pl: string
  /** Poprawna kolejność klocków. Interpunkcja doklejona do słowa, żeby nie robić osobnych klocków. */
  tokens: string[]
  /** Klocki-pułapki dorzucane w T2/T3. */
  distractors: string[]
  grammarTag: string
  worldId: number
}

export interface DialogLine {
  who: 'A' | 'B'
  en: string
  pl: string
}

export interface Dialog {
  id: string
  title: string
  worldId: number
  lines: DialogLine[]
}

export interface Lesson {
  id: string
  worldId: number
  /** Dzień tygodnia z planu: Pon–Pt. */
  day: string
  title: string
  icon: string
  /** Nowe słowa wprowadzane w tej lekcji. */
  newWords: string[]
  /** Zdania ćwiczone w tej lekcji. */
  sentences: string[]
  /** Dialog na finał lekcji (opcjonalnie). */
  dialogId?: string
}

export interface World {
  id: number
  title: string
  subtitle: string
  icon: string
  /** Kolory Tailwind użyte na mapie. */
  hue: string
  lessons: Lesson[]
}

// ——— postęp ———

export interface ItemProgress {
  itemId: string
  box: Box
  seen: number
  correct: number
  /** Seria poprawnych z rzędu — steruje awansem na wyższy tier. */
  streak: number
  errors: number
  dueAt: number
  /** Ostatni tier, na którym element był ćwiczony. */
  tier: Tier
}

export interface ProfileSettings {
  sounds: boolean
  voice: string | null
  rate: number
  /** 8-latek: 2 (mówi i słucha, klocki zamiast klawiatury). 10-latek: 3 (pisze). */
  maxTier: Tier
  dailyGoal: 1 | 2 | 3
  dyslexiaFont: boolean
}

export interface Profile {
  id: string
  name: string
  avatar: string
  age: number
  xp: number
  crystals: number
  streak: number
  /** Ostatni dzień z ukończoną lekcją, format YYYY-MM-DD. */
  lastPlayedDay: string | null
  settings: ProfileSettings
}

// ——— zadania w lekcji ———

export type ExerciseKind =
  | 'listenPick'
  | 'pictureQuiz'
  | 'memory'
  | 'match'
  | 'sentence'
  | 'fillGap'
  | 'spelling'
  | 'oddOne'
  | 'sorting'
  | 'bubbles'
  | 'math'
  | 'dialog'

interface TaskBase {
  /** Unikalny w obrębie kolejki — klucz Reacta i identyfikator w lapse queue. */
  key: string
  kind: ExerciseKind
  tier: Tier
  /** Elementy, których postęp zaktualizuje odpowiedź na to zadanie. */
  itemIds: string[]
  isReview: boolean
}

export interface ListenPickTask extends TaskBase {
  kind: 'listenPick'
  word: Word
  options: Word[]
}

export interface PictureQuizTask extends TaskBase {
  kind: 'pictureQuiz'
  word: Word
  options: Word[]
  /** pic2word: pokazujemy obrazek, wybieramy słowo. word2pic: odwrotnie. */
  mode: 'pic2word' | 'word2pic' | 'pl2word'
}

export interface MemoryTask extends TaskBase {
  kind: 'memory'
  words: Word[]
  variant: 'pic-en' | 'en-pl'
}

export interface SentenceTask extends TaskBase {
  kind: 'sentence'
  sentence: Sentence
  /** Klocki podane dziecku, już potasowane. */
  pool: string[]
  /** Czy pokazujemy tłumaczenie PL jako podpowiedź. */
  showHint: boolean
}

export interface SpellingTask extends TaskBase {
  kind: 'spelling'
  word: Word
  /** Litery do wyboru (T1/T2). Puste przy trybie klawiatury. */
  letters: string[]
  mode: 'tiles' | 'keyboard'
}

export interface DialogTask extends TaskBase {
  kind: 'dialog'
  dialog: Dialog
  /** Indeks ukrytej linii. */
  hiddenIndex: number
  options: string[]
}

/** Połącz w pary — dokładnie jak „Połącz słowo z polskim znaczeniem" z kart pracy. */
export interface MatchTask extends TaskBase {
  kind: 'match'
  pairs: Word[]
  variant: 'pic-en' | 'en-pl'
}

/** Uzupełnij lukę — jak Karta pracy 2B i 3A. */
export interface FillGapTask extends TaskBase {
  kind: 'fillGap'
  sentence: Sentence
  gapIndex: number
  options: string[]
}

export interface OddOneOutTask extends TaskBase {
  kind: 'oddOne'
  items: Word[]
  oddId: string
  /** Kategoria trzech pasujących elementów, po polsku. */
  categoryLabel: string
}

export interface SortingBucket {
  key: string
  label: string
  icon: string
}

/** Sortowanie do koszyków — elementy lecą jeden po drugim, żeby nie trzeba było przeciągać. */
export interface SortingTask extends TaskBase {
  kind: 'sorting'
  buckets: SortingBucket[]
  items: { word: Word; bucketKey: string }[]
}

/** Złap właściwe słowa — zadanie zręcznościowe na rozładowanie w środku lekcji. */
export interface BubblesTask extends TaskBase {
  kind: 'bubbles'
  label: string
  items: Word[]
  targetIds: string[]
}

/** Działania po angielsku — prosto z Karty pracy 1A, zadanie 3. */
export interface MathTask extends TaskBase {
  kind: 'math'
  a: number
  b: number
  op: '+' | '−'
  options: string[]
  answer: string
}

export type Task =
  | ListenPickTask
  | PictureQuizTask
  | MemoryTask
  | MatchTask
  | SentenceTask
  | FillGapTask
  | SpellingTask
  | OddOneOutTask
  | SortingTask
  | BubblesTask
  | MathTask
  | DialogTask

// ——— rundy w lekcji ———

/** Lekcja trwa ~45 minut, więc dzieli się na cztery rundy z przerwą między nimi. */
export interface RoundMeta {
  title: string
  icon: string
  subtitle: string
}

export const ROUNDS: RoundMeta[] = [
  { title: 'Poznaj', icon: '👀', subtitle: 'Nowe słowa' },
  { title: 'Ćwicz', icon: '💪', subtitle: 'Utrwalamy' },
  { title: 'Zdania', icon: '🧩', subtitle: 'Całe zdania' },
  { title: 'Mistrz', icon: '🏆', subtitle: 'Gry i powtórka' },
]

export const ROUND_COUNT = ROUNDS.length
