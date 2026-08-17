import { useState } from 'react'
import { motion } from 'motion/react'
import { WORLDS } from '../content/worlds'
import { ROUND_COUNT } from '../types'
import { dayKey, isLessonUnlocked, roundsDone, useActiveProfile, useGame } from '../store/useGame'
import { levelProgress } from '../engine/scoring'
import { Bar, Chip, Stars } from '../ui/kit'
import { Settings } from './Settings'
import { Emoji } from '../ui/Emoji'

const HUE: Record<string, { band: string; node: string; shadow: string; text: string }> = {
  amber: { band: 'from-amber-200 to-amber-100', node: 'bg-amber-400', shadow: '[--chunky-shadow:var(--color-amber-600)]', text: 'text-amber-900' },
  emerald: { band: 'from-emerald-200 to-emerald-100', node: 'bg-emerald-400', shadow: '[--chunky-shadow:var(--color-emerald-600)]', text: 'text-emerald-900' },
  sky: { band: 'from-sky-200 to-sky-100', node: 'bg-sky-400', shadow: '[--chunky-shadow:var(--color-sky-600)]', text: 'text-sky-900' },
  fuchsia: { band: 'from-fuchsia-200 to-fuchsia-100', node: 'bg-fuchsia-400', shadow: '[--chunky-shadow:var(--color-fuchsia-600)]', text: 'text-fuchsia-900' },
  rose: { band: 'from-rose-200 to-rose-100', node: 'bg-rose-400', shadow: '[--chunky-shadow:var(--color-rose-600)]', text: 'text-rose-900' },
  cyan: { band: 'from-cyan-200 to-cyan-100', node: 'bg-cyan-400', shadow: '[--chunky-shadow:var(--color-cyan-600)]', text: 'text-cyan-900' },
  orange: { band: 'from-orange-200 to-orange-100', node: 'bg-orange-400', shadow: '[--chunky-shadow:var(--color-orange-600)]', text: 'text-orange-900' },
  lime: { band: 'from-lime-200 to-lime-100', node: 'bg-lime-400', shadow: '[--chunky-shadow:var(--color-lime-600)]', text: 'text-lime-900' },
  teal: { band: 'from-teal-200 to-teal-100', node: 'bg-teal-400', shadow: '[--chunky-shadow:var(--color-teal-600)]', text: 'text-teal-900' },
  violet: { band: 'from-violet-200 to-violet-100', node: 'bg-violet-400', shadow: '[--chunky-shadow:var(--color-violet-600)]', text: 'text-violet-900' },
}

export function MapScreen({ onStart }: { onStart: (lessonId: string) => void }) {
  const profile = useActiveProfile()
  const stars = useGame((s) => s.stars)
  const rounds = useGame((s) => s.rounds)
  const history = useGame((s) => s.history)
  const [settingsOpen, setSettingsOpen] = useState(false)

  if (!profile) return null
  const { level, into, span } = levelProgress(profile.xp)
  const today = history[`${profile.id}|${dayKey()}`]
  const doneToday = today?.lessons ?? 0
  const goal = profile.settings.dailyGoal

  return (
    <div className="mx-auto min-h-full max-w-md pb-16">
      {/* Pasek gracza */}
      <header className="sticky top-0 z-20 bg-indigo-50/95 px-4 pt-4 pb-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white shadow"
            aria-label="Ustawienia"
          >
            <Emoji value={profile.avatar} size="sm" />
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <span className="truncate font-black">{profile.name}</span>
              <span className="text-xs font-extrabold text-ink-soft">poziom {level}</span>
            </div>
            <div className="mt-1">
              <Bar value={into} max={span} className="bg-violet-500" />
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1 text-sm font-black">
            <span className="flex items-center gap-1">
              <Emoji value="💎" size="xs" /> {profile.crystals}
            </span>
            <span className="flex items-center gap-1">
              <Emoji value="🔥" size="xs" /> {profile.streak}
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Chip className={doneToday >= goal ? 'bg-emerald-400 text-white' : ''}>
            Dziś: {Math.min(doneToday, goal)} / {goal} {goal === 1 ? 'lekcja' : 'lekcje'}
          </Chip>
          {doneToday >= goal && <span className="text-sm font-extrabold text-emerald-700">Cel zrobiony! 🎉</span>}
        </div>
      </header>

      {/* Krainy */}
      <div className="flex flex-col gap-8 px-4 pt-6">
        {WORLDS.map((world) => {
          const hue = HUE[world.hue]
          return (
            <section key={world.id}>
              <div className={`rounded-3xl bg-gradient-to-b ${hue.band} px-4 py-3`}>
                <div className="flex items-center gap-3">
                  <Emoji value={world.icon} size="md" />
                  <div>
                    <p className={`text-xs font-black tracking-wide uppercase ${hue.text} opacity-70`}>
                      {world.subtitle}
                    </p>
                    <h2 className={`text-xl font-black ${hue.text}`}>{world.title}</h2>
                  </div>
                </div>
              </div>

              <ol className="mt-4 flex flex-col gap-3">
                {world.lessons.map((lesson, i) => {
                  const key = `${profile.id}|${lesson.id}`
                  const earned = stars[key]
                  const started = roundsDone(rounds, profile.id, lesson.id)
                  const unlocked = isLessonUnlocked(stars, profile.id, lesson.id)
                  const offset = i % 2 === 0 ? 'self-start' : 'self-end'

                  return (
                    <li key={lesson.id} className={`flex w-[88%] ${offset}`}>
                      <motion.button
                        type="button"
                        whileTap={unlocked ? { scale: 0.97 } : undefined}
                        disabled={!unlocked}
                        onClick={() => onStart(lesson.id)}
                        className={`chunky chunky-press flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left ${
                          unlocked
                            ? `${hue.node} ${hue.shadow} text-white`
                            : 'bg-slate-200 text-slate-400 [--chunky-shadow:var(--color-slate-300)]'
                        }`}
                      >
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/30">
                          <Emoji value={unlocked ? lesson.icon : '🔒'} size="sm" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-baseline gap-2">
                            <span className="rounded bg-white/30 px-1.5 text-[11px] font-black">
                              {lesson.day}
                            </span>
                            <span className="truncate font-black">{lesson.title}</span>
                          </span>
                          {/* Etykiety „· dialog" nie ma — dialog jest w każdej lekcji,
                              więc nic by nie odróżniała. */}
                          <span className="mt-0.5 flex items-center gap-2 text-xs font-bold opacity-90">
                            <span>{lesson.newWords.length} słów</span>
                            {started > 0 && !earned && (
                              <span className="flex gap-0.5">
                                {Array.from({ length: ROUND_COUNT }, (_, r) => (
                                  <span key={r} className={r < started ? '' : 'opacity-35'}>
                                    ●
                                  </span>
                                ))}
                              </span>
                            )}
                          </span>
                        </span>
                        {earned ? <Stars count={earned} size="sm" /> : null}
                      </motion.button>
                    </li>
                  )
                })}
              </ol>
            </section>
          )
        })}
      </div>

      {settingsOpen && <Settings onClose={() => setSettingsOpen(false)} />}
    </div>
  )
}
