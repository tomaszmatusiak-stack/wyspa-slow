import type { Challenge, ItemProgress, Tier } from '../types'

/**
 * Tier wynika z pudełka SRS, ale jest przycięty ustawieniem profilu.
 * Zgodnie z planem: 8-latek zostaje na T2 (mówi i słucha, układa z klocków),
 * 10-latek wchodzi na T3 (pisze z klawiatury, układa zdania bez wzoru).
 */
export function tierFor(p: ItemProgress | undefined, maxTier: Tier): Tier {
  const base: Tier = !p || p.box <= 1 ? 1 : p.box <= 3 ? 2 : 3
  return Math.min(base, maxTier) as Tier
}

/**
 * Poziom wyzwania. Oddzielny od wieku, bo „ile lat" i „ile wyzwania" to dwie różne rzeczy:
 * 8-latek może nie chcieć pisać, a jednocześnie nudzić się przy trzech opcjach do wyboru.
 *
 * `easeAfterErrors: null` znaczy, że apka nigdy nie ułatwia po serii błędów.
 */
export interface ChallengeRules {
  label: string
  hint: string
  options: Record<Tier, number>
  /** Ile klocków-pułapek dorzucamy do układania zdania. */
  sentenceExtras: Record<Tier, number>
  /** Ile zbędnych liter dorzucamy do literowania. */
  spellingNoise: Record<Tier, number>
  memoryPairs: Record<Tier, number>
  /** Czy przy T1 pokazujemy tłumaczenie zdania po polsku. */
  hintAtT1: boolean
  easeAfterErrors: number | null
}

export const CHALLENGE: Record<Challenge, ChallengeRules> = {
  spokojny: {
    label: 'Spokojny',
    hint: 'Mało opcji, podpowiedzi po polsku, apka ułatwia po błędach.',
    options: { 1: 3, 2: 4, 3: 5 },
    sentenceExtras: { 1: 0, 2: 2, 3: 4 },
    spellingNoise: { 1: 0, 2: 2, 3: 3 },
    memoryPairs: { 1: 3, 2: 4, 3: 5 },
    hintAtT1: true,
    easeAfterErrors: 3,
  },
  normalny: {
    label: 'Normalny',
    hint: 'Więcej opcji i pułapek. Podpowiedź tylko przy pierwszym kontakcie.',
    options: { 1: 4, 2: 5, 3: 6 },
    sentenceExtras: { 1: 1, 2: 3, 3: 6 },
    spellingNoise: { 1: 1, 2: 3, 3: 4 },
    memoryPairs: { 1: 4, 2: 5, 3: 6 },
    hintAtT1: true,
    easeAfterErrors: 4,
  },
  ambitny: {
    label: 'Ambitny',
    hint: 'Dużo opcji, pełne pułapki, bez podpowiedzi po polsku, bez ułatwiania.',
    options: { 1: 5, 2: 6, 3: 8 },
    sentenceExtras: { 1: 3, 2: 5, 3: 8 },
    spellingNoise: { 1: 2, 2: 4, 3: 5 },
    memoryPairs: { 1: 5, 2: 6, 3: 6 },
    hintAtT1: false,
    easeAfterErrors: null,
  },
}

export function rulesFor(challenge: Challenge): ChallengeRules {
  return CHALLENGE[challenge] ?? CHALLENGE.normalny
}

/** Ile opcji pokazać przy wyborze — razem z poprawną. */
export function optionCount(tier: Tier, challenge: Challenge): number {
  return rulesFor(challenge).options[tier]
}

/**
 * Anty-frustracja: po serii błędów zjeżdżamy o tier w dół na resztę rundy.
 * Liczymy błędy pod rząd w całej sesji, nie per słowo — zmęczone dziecko myli się wszędzie.
 * Na poziomie ambitnym wyłączona: tam chodzi właśnie o to, żeby było trudno.
 */
export class SessionMood {
  private consecutiveErrors = 0
  private consecutiveCorrect = 0
  /** −1 = ułatwiamy, 0 = normalnie. Nie podbijamy powyżej 0 — trudność podnosi SRS. */
  private modifier = 0

  constructor(private readonly easeAfterErrors: number | null = 4) {}

  register(correct: boolean): void {
    if (this.easeAfterErrors === null) return

    if (correct) {
      this.consecutiveCorrect++
      this.consecutiveErrors = 0
      if (this.consecutiveCorrect >= 3 && this.modifier < 0) {
        this.modifier = 0
        this.consecutiveCorrect = 0
      }
    } else {
      this.consecutiveErrors++
      this.consecutiveCorrect = 0
      if (this.consecutiveErrors >= this.easeAfterErrors) {
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
