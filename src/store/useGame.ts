import { create } from 'zustand'
import type { ItemProgress, Profile, ProfileSettings, Tier } from '../types'
import { applyAnswer, blankProgress } from '../engine/srs'
import { lessonReward, roundReward } from '../engine/scoring'
import { LESSON_ORDER } from '../content/worlds'
import { debounced, kvGet, kvSet } from './persist'
import { setSfxEnabled } from '../audio/sfx'

const SAVE_KEY = 'save.v1'

export interface DayStat {
  lessons: number
  seconds: number
  correct: number
  wrong: number
}

interface SaveData {
  profiles: Profile[]
  activeProfileId: string | null
  /** klucz: `${profileId}|${itemId}` */
  progress: Record<string, ItemProgress>
  /** klucz: `${profileId}|${lessonId}` */
  stars: Record<string, 1 | 2 | 3>
  /** klucz: `${profileId}|${lessonId}` → ile rund lekcji ukończono (0–4) */
  rounds: Record<string, number>
  /** klucz: `${profileId}|${YYYY-MM-DD}` */
  history: Record<string, DayStat>
}

const EMPTY: SaveData = {
  profiles: [],
  activeProfileId: null,
  progress: {},
  stars: {},
  rounds: {},
  history: {},
}

// ——— pomocnicze

export function dayKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function parseDay(key: string): Date {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/**
 * Plan przewiduje naukę pon–pt, a weekend jest luźny.
 * Seria nie może więc pękać za nieklikanie w sobotę — zerujemy ją dopiero
 * po opuszczonym dniu roboczym.
 */
export function advanceStreak(lastDay: string | null, today: string, streak: number): number {
  if (!lastDay) return 1
  if (lastDay === today) return streak

  const cursor = parseDay(lastDay)
  const end = parseDay(today)
  cursor.setDate(cursor.getDate() + 1)

  while (cursor < end) {
    const dow = cursor.getDay()
    if (dow !== 0 && dow !== 6) return 1 // opuszczony dzień roboczy
    cursor.setDate(cursor.getDate() + 1)
  }
  return streak + 1
}

export function defaultSettings(age: number): ProfileSettings {
  return {
    sounds: true,
    voice: null,
    rate: 0.85,
    // Zgodnie z planem: młodsze dziecko mówi i słucha, starsze dodatkowo pisze.
    maxTier: age >= 10 ? 3 : 2,
    // Jedna lekcja to cały dzień z planu (~45 min), więc domyślny cel to jedna.
    dailyGoal: 1,
    dyslexiaFont: false,
  }
}

// ——— store

interface GameState extends SaveData {
  ready: boolean
  hydrate: () => Promise<void>
  createProfile: (name: string, avatar: string, age: number) => void
  selectProfile: (id: string | null) => void
  updateSettings: (patch: Partial<ProfileSettings>) => void
  recordAnswer: (itemIds: string[], correct: boolean, tier: Tier) => void
  finishRound: (args: {
    lessonId: string
    round: number
    tasksDone: number
    errors: number
    seconds: number
  }) => { xp: number; crystals: number; levelUp: boolean }
  finishLesson: (args: { lessonId: string; tasks: number; errors: number }) => {
    xp: number
    crystals: number
    stars: 1 | 2 | 3
    levelUp: boolean
    firstClear: boolean
  }
}

const levelOf = (xp: number) => Math.floor((Math.sqrt(1 + (8 * xp) / 100) - 1) / 2) + 1

const save = debounced((data: SaveData) => void kvSet(SAVE_KEY, data), 400)

function snapshot(s: GameState): SaveData {
  return {
    profiles: s.profiles,
    activeProfileId: s.activeProfileId,
    progress: s.progress,
    stars: s.stars,
    rounds: s.rounds,
    history: s.history,
  }
}

export const useGame = create<GameState>((set, get) => ({
  ...EMPTY,
  ready: false,

  hydrate: async () => {
    const data = await kvGet<SaveData>(SAVE_KEY)
    set({ ...EMPTY, ...data, ready: true })
    const active = get().profiles.find((p) => p.id === get().activeProfileId)
    setSfxEnabled(active?.settings.sounds ?? true)
  },

  createProfile: (name, avatar, age) => {
    const profile: Profile = {
      id: `p${Date.now().toString(36)}`,
      name,
      avatar,
      age,
      xp: 0,
      crystals: 0,
      streak: 0,
      lastPlayedDay: null,
      settings: defaultSettings(age),
    }
    set((s) => {
      const next = { ...s, profiles: [...s.profiles, profile], activeProfileId: profile.id }
      save(snapshot(next))
      return next
    })
  },

  selectProfile: (id) => {
    set((s) => {
      const next = { ...s, activeProfileId: id }
      const active = next.profiles.find((p) => p.id === id)
      setSfxEnabled(active?.settings.sounds ?? true)
      save(snapshot(next))
      return next
    })
  },

  updateSettings: (patch) => {
    set((s) => {
      if (!s.activeProfileId) return s
      const profiles = s.profiles.map((p) =>
        p.id === s.activeProfileId ? { ...p, settings: { ...p.settings, ...patch } } : p,
      )
      const next = { ...s, profiles }
      const active = profiles.find((p) => p.id === s.activeProfileId)
      setSfxEnabled(active?.settings.sounds ?? true)
      save(snapshot(next))
      return next
    })
  },

  recordAnswer: (itemIds, correct, tier) => {
    set((s) => {
      const pid = s.activeProfileId
      if (!pid) return s
      const now = Date.now()
      const progress = { ...s.progress }
      for (const itemId of itemIds) {
        const key = `${pid}|${itemId}`
        const prev = progress[key] ?? blankProgress(itemId)
        progress[key] = applyAnswer(prev, correct, tier, now)
      }

      const today = dayKey()
      const hKey = `${pid}|${today}`
      const day = s.history[hKey] ?? { lessons: 0, seconds: 0, correct: 0, wrong: 0 }
      const history = {
        ...s.history,
        [hKey]: {
          ...day,
          correct: day.correct + (correct ? 1 : 0),
          wrong: day.wrong + (correct ? 0 : 1),
        },
      }

      const next = { ...s, progress, history }
      save(snapshot(next))
      return next
    })
  },

  finishRound: ({ lessonId, round, tasksDone, errors, seconds }) => {
    const s = get()
    const pid = s.activeProfileId
    if (!pid) return { xp: 0, crystals: 0, levelUp: false }

    const roundKey = `${pid}|${lessonId}`
    const doneBefore = s.rounds[roundKey] ?? 0
    const firstClear = round >= doneBefore
    const reward = roundReward(tasksDone, errors, firstClear)

    const profile = s.profiles.find((p) => p.id === pid)!
    const xpBefore = profile.xp

    const profiles = s.profiles.map((p) =>
      p.id !== pid ? p : { ...p, xp: p.xp + reward.xp, crystals: p.crystals + reward.crystals },
    )

    const today = dayKey()
    const hKey = `${pid}|${today}`
    const day = s.history[hKey] ?? { lessons: 0, seconds: 0, correct: 0, wrong: 0 }

    const next: GameState = {
      ...s,
      profiles,
      rounds: { ...s.rounds, [roundKey]: Math.max(doneBefore, round + 1) },
      history: { ...s.history, [hKey]: { ...day, seconds: day.seconds + seconds } },
    }
    set(next)
    save(snapshot(next))

    return { ...reward, levelUp: levelOf(xpBefore + reward.xp) > levelOf(xpBefore) }
  },

  finishLesson: ({ lessonId, tasks, errors }) => {
    const s = get()
    const pid = s.activeProfileId
    if (!pid) return { xp: 0, crystals: 0, stars: 1 as const, levelUp: false, firstClear: false }

    const starKey = `${pid}|${lessonId}`
    const previousStars = s.stars[starKey]
    const firstClear = previousStars === undefined
    const reward = lessonReward(tasks, errors, firstClear)

    const today = dayKey()
    const profile = s.profiles.find((p) => p.id === pid)!
    const xpBefore = profile.xp

    const profiles = s.profiles.map((p) =>
      p.id !== pid
        ? p
        : {
            ...p,
            xp: p.xp + reward.xp,
            crystals: p.crystals + reward.crystals,
            streak: advanceStreak(p.lastPlayedDay, today, p.streak),
            lastPlayedDay: today,
          },
    )

    const hKey = `${pid}|${today}`
    const day = s.history[hKey] ?? { lessons: 0, seconds: 0, correct: 0, wrong: 0 }

    const next: GameState = {
      ...s,
      profiles,
      stars: { ...s.stars, [starKey]: Math.max(previousStars ?? 0, reward.stars) as 1 | 2 | 3 },
      // Ukończone rundy zerujemy, żeby ponowne wejście zaczynało lekcję od początku.
      rounds: { ...s.rounds, [`${pid}|${lessonId}`]: 0 },
      history: { ...s.history, [hKey]: { ...day, lessons: day.lessons + 1 } },
    }
    set(next)
    save(snapshot(next))

    return { ...reward, firstClear, levelUp: levelOf(xpBefore + reward.xp) > levelOf(xpBefore) }
  },
}))

// ——— selektory

export function useActiveProfile(): Profile | null {
  return useGame((s) => s.profiles.find((p) => p.id === s.activeProfileId) ?? null)
}

export function progressMapFor(state: GameState, profileId: string): Map<string, ItemProgress> {
  const prefix = `${profileId}|`
  const map = new Map<string, ItemProgress>()
  for (const [key, value] of Object.entries(state.progress)) {
    if (key.startsWith(prefix)) map.set(key.slice(prefix.length), value)
  }
  return map
}

/** Lekcja jest otwarta, jeśli poprzednia w kolejności została zaliczona. */
export function isLessonUnlocked(stars: SaveData['stars'], profileId: string, lessonId: string): boolean {
  const idx = LESSON_ORDER.indexOf(lessonId)
  if (idx <= 0) return true
  return stars[`${profileId}|${LESSON_ORDER[idx - 1]}`] !== undefined
}

export function roundsDone(
  rounds: SaveData['rounds'],
  profileId: string,
  lessonId: string,
): number {
  return rounds[`${profileId}|${lessonId}`] ?? 0
}
