import type { Task } from '../types'

export interface ExerciseProps<T extends Task = Task> {
  task: T
  /** Wypowiada tekst po angielsku głosem z ustawień profilu. */
  say: (text: string) => void
  /**
   * Wywoływane raz, po odpowiedzi dziecka.
   * `solution` trafia na pasek informacji zwrotnej, gdy odpowiedź była błędna.
   */
  onAnswer: (correct: boolean, solution: string) => void
}

/** Wspólny nagłówek polecenia nad każdym ćwiczeniem. */
export const PROMPTS = {
  listenPick: 'Posłuchaj i wskaż',
  pic2word: 'Co to jest?',
  word2pic: 'Wskaż obrazek',
  pl2word: 'Jak to jest po angielsku?',
  memory: 'Znajdź pary',
  match: 'Połącz w pary',
  sentence: 'Ułóż zdanie',
  fillGap: 'Uzupełnij zdanie',
  spelling: 'Ułóż słowo',
  spellingKeyboard: 'Napisz słowo',
  oddOne: 'Co tu nie pasuje?',
  sorting: 'Do którego koszyka?',
  bubbles: 'Złap wszystkie słowa',
  math: 'Policz po angielsku',
  dialog: 'Czego brakuje w rozmowie?',
  verbForm: 'Wybierz właściwą formę',
  verbTable: 'Odmień czasownik',
  tenseSort: 'Kiedy to się dzieje?',
} as const
