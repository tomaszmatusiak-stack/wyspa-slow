export const XP_PER_TASK = 10
export const XP_PERFECT_BONUS = 50
export const XP_FIRST_CLEAR_BONUS = 20

/** Progi poziomów gracza — rosną łagodnie, żeby awans nie znikał po tygodniu. */
export function levelFromXp(xp: number): number {
  return Math.floor((Math.sqrt(1 + (8 * xp) / 100) - 1) / 2) + 1
}

export function xpForLevel(level: number): number {
  const n = level - 1
  return Math.round((100 * n * (n + 1)) / 2)
}

export function levelProgress(xp: number): { level: number; into: number; span: number } {
  const level = levelFromXp(xp)
  const from = xpForLevel(level)
  const to = xpForLevel(level + 1)
  return { level, into: xp - from, span: Math.max(1, to - from) }
}

/**
 * Gwiazdki liczone ze skuteczności, nie z liczby błędów — lekcja ma teraz ~48 zadań,
 * więc „najwyżej jeden błąd" byłoby nie do osiągnięcia.
 */
export function starsFor(errors: number, tasks: number): 1 | 2 | 3 {
  const accuracy = tasks > 0 ? 1 - errors / tasks : 1
  if (accuracy >= 0.9) return 3
  if (accuracy >= 0.75) return 2
  return 1
}

export interface Reward {
  xp: number
  crystals: number
}

/**
 * Nagroda za rundę. Dziecko dostaje ją od razu po ~11 minutach,
 * więc przerwanie lekcji w połowie nie kasuje całej pracy.
 * Powtórka daje ułamek — chodzi o gwiazdki, nie o farmienie tej samej lekcji.
 */
export function roundReward(tasksDone: number, errors: number, firstClear: boolean): Reward {
  const base = tasksDone * XP_PER_TASK
  const perfect = errors === 0 ? XP_PERFECT_BONUS : 0
  return {
    xp: firstClear ? base + perfect : Math.round(base * 0.3),
    crystals: firstClear ? 5 : 1,
  }
}

export interface LessonReward extends Reward {
  stars: 1 | 2 | 3
}

/** Premia za domknięcie całego dnia — cztery rundy z rzędu. */
export function lessonReward(tasks: number, errors: number, firstClear: boolean): LessonReward {
  const stars = starsFor(errors, tasks)
  return {
    xp: firstClear ? XP_FIRST_CLEAR_BONUS + stars * 20 : 10,
    crystals: firstClear ? 10 + stars * 5 : stars,
    stars,
  }
}
