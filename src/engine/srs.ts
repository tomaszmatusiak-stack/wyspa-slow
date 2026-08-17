import type { Box, ItemProgress, Tier } from '../types'

/** Leitner: 5 pudełek, interwały 1 → 3 → 7 → 14 → 30 dni. */
export const BOX_INTERVAL_DAYS: Record<Box, number> = { 0: 0, 1: 1, 2: 3, 3: 7, 4: 14, 5: 30 }

const DAY = 24 * 60 * 60 * 1000

export function blankProgress(itemId: string): ItemProgress {
  return { itemId, box: 0, seen: 0, correct: 0, streak: 0, errors: 0, dueAt: 0, tier: 1 }
}

export function isDue(p: ItemProgress | undefined, now: number): boolean {
  if (!p) return false
  return p.dueAt <= now
}

/** Element opanowany = pudełko 4 lub 5. Tego licznika używa panel rodzica. */
export function isMastered(p: ItemProgress | undefined): boolean {
  return !!p && p.box >= 4
}

export function applyAnswer(
  prev: ItemProgress,
  correct: boolean,
  tier: Tier,
  now: number,
): ItemProgress {
  const seen = prev.seen + 1

  if (!correct) {
    // Powrót do pudełka 1, nie do zera — dziecko nie traci całego dorobku za jedną pomyłkę.
    const box: Box = 1
    return {
      ...prev,
      seen,
      streak: 0,
      errors: prev.errors + 1,
      box,
      tier,
      dueAt: now + BOX_INTERVAL_DAYS[box] * DAY,
    }
  }

  const box = Math.min(5, prev.box + 1) as Box
  return {
    ...prev,
    seen,
    correct: prev.correct + 1,
    streak: prev.streak + 1,
    box,
    tier,
    dueAt: now + BOX_INTERVAL_DAYS[box] * DAY,
  }
}
