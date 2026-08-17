import { motion } from 'motion/react'
import type { Lesson } from '../types'
import { ROUNDS, ROUND_COUNT } from '../types'
import { Burst, PrimaryButton } from '../ui/kit'
import { Emoji } from '../ui/Emoji'

/**
 * Przerwa między rundami. Dzienna lekcja trwa ~45 minut, więc dziecko dostaje
 * trzy naturalne miejsca na oddech — i nagrodę, która zostaje nawet jeśli skończy tutaj.
 */
export function RoundBreak({
  lesson,
  finishedRound,
  xp,
  crystals,
  ranOutOfTime,
  nextIsTest,
  testSize,
  onContinue,
  onStop,
}: {
  lesson: Lesson
  finishedRound: number
  xp: number
  crystals: number
  ranOutOfTime: boolean
  nextIsTest: boolean
  testSize: number
  onContinue: () => void
  onStop: () => void
}) {
  const nextMeta = ROUNDS[finishedRound + 1]

  return (
    <div className="relative mx-auto flex min-h-full max-w-md flex-col items-center justify-center gap-7 px-6 py-10 text-center">
      <Burst count={12} />

      <motion.div
        initial={{ scale: 0.4, rotate: -12 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 13 }}
      >
        <Emoji value={ROUNDS[finishedRound].icon} size="xl" />
      </motion.div>

      <div>
        <h1 className="text-3xl font-black">Runda {finishedRound + 1} zaliczona!</h1>
        <p className="mt-1 font-bold text-ink-soft">
          {lesson.day} · {lesson.title}
        </p>
      </div>

      {/* Postęp dnia */}
      <div className="flex gap-2">
        {ROUNDS.map((r, i) => (
          <div
            key={r.title}
            className={`flex h-14 w-14 flex-col items-center justify-center rounded-2xl text-xl ${
              i <= finishedRound ? 'bg-emerald-400 text-white' : 'bg-white/70 opacity-50'
            }`}
          >
            {i <= finishedRound ? '✓' : <Emoji value={r.icon} size="sm" />}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Box label="XP" value={`+${xp}`} />
        <Box label="Kryształy" value={`+${crystals}`} />
      </div>

      {nextIsTest && (
        <div className="rounded-2xl bg-rose-100 px-4 py-3 text-sm font-bold text-rose-900">
          Teraz <strong>sprawdzian</strong>: {testSize} zadań, <strong>bez podpowiedzi</strong>,
          każde pytanie tylko raz. Z niego wychodzi ocena i gwiazdki za dzień.
        </div>
      )}

      {ranOutOfTime && (
        <p className="rounded-2xl bg-amber-200 px-4 py-2 text-sm font-bold">
          Ta runda trwała długo — dobry moment na przerwę.
        </p>
      )}

      <div className="flex w-full flex-col gap-3">
        {nextIsTest ? (
          <PrimaryButton onClick={onContinue}>
            <Emoji value="📋" size="xs" /> Zaczynam sprawdzian
          </PrimaryButton>
        ) : (
          <PrimaryButton onClick={onContinue}>
            Dalej: <Emoji value={nextMeta.icon} size="xs" /> {nextMeta.title}
            <span className="ml-2 text-sm font-bold opacity-80">
              ({finishedRound + 2}/{ROUND_COUNT})
            </span>
          </PrimaryButton>
        )}
        <PrimaryButton tone="slate" onClick={onStop}>
          Na dziś wystarczy
        </PrimaryButton>
      </div>

      <p className="text-xs font-bold text-ink-soft">
        {nextIsTest
          ? 'Postęp jest zapisany — sprawdzian możesz zrobić też później.'
          : `Postęp jest zapisany — jutro zaczniesz od rundy ${finishedRound + 2}.`}
      </p>
    </div>
  )
}

function Box({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-28 rounded-2xl bg-white/80 px-4 py-3">
      <p className="text-2xl font-black">{value}</p>
      <p className="text-xs font-extrabold text-ink-soft">{label}</p>
    </div>
  )
}
