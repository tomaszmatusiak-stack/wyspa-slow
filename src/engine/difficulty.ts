import type { ItemProgress, Tier } from '../types'

/**
 * Tier wynika z pudełka SRS, ale jest przycięty ustawieniem profilu.
 * Zgodnie z planem: 8-latek zostaje na T2 (mówi i słucha, układa z klocków),
 * 10-latek wchodzi na T3 (pisze z klawiatury, układa zdania bez wzoru).
 */
export function tierFor(p: ItemProgress | undefined, maxTier: Tier): Tier {
  const base: Tier = !p || p.box <= 1 ? 1 : p.box <= 3 ? 2 : 3
  return Math.min(base, maxTier) as Tier
}

/** Ile błędnych opcji pokazać przy wyborze. */
export function optionCount(tier: Tier): number {
  return tier === 1 ? 3 : tier === 2 ? 4 : 6
}

/**
 * Anty-frustracja: po serii błędów zjeżdżamy o tier w dół na resztę lekcji.
 * Liczymy błędy pod rząd w całej sesji, nie per słowo — zmęczone dziecko myli się wszędzie.
 */
export class SessionMood {
  private consecutiveErrors = 0
  private consecutiveCorrect = 0
  /** −1 = ułatwiamy, 0 = normalnie. Nie podbijamy powyżej 0 — trudność podnosi SRS. */
  private modifier = 0

  register(correct: boolean): void {
    if (correct) {
      this.consecutiveCorrect++
      this.consecutiveErrors = 0
      if (this.consecutiveCorrect >= 5 && this.modifier < 0) {
        this.modifier = 0
        this.consecutiveCorrect = 0
      }
    } else {
      this.consecutiveErrors++
      this.consecutiveCorrect = 0
      if (this.consecutiveErrors >= 3) {
        this.modifier = -1
        this.consecutiveErrors = 0
      }
    }
  }

  adjust(tier: Tier): Tier {
    return Math.max(1, tier + this.modifier) as Tier
  }

  get easing(): boolean {
    return this.modifier < 0
  }
}
