import { motion } from 'motion/react'
import type { LessonResult } from './LessonScreen'
import { LESSON_BY_ID, LESSON_ORDER } from '../content/worlds'
import { isLessonUnlocked, useActiveProfile, useGame } from '../store/useGame'
import { Burst, PrimaryButton, Stars } from '../ui/kit'
import { Emoji } from '../ui/Emoji'

export function Summary({
  result,
  onMap,
  onNext,
}: {
  result: LessonResult
  onMap: () => void
  onNext: (lessonId: string) => void
}) {
  const profile = useActiveProfile()
  const stars = useGame((s) => s.stars)
  const lesson = LESSON_BY_ID.get(result.lessonId)!

  const idx = LESSON_ORDER.indexOf(result.lessonId)
  const nextId = LESSON_ORDER[idx + 1]
  const nextUnlocked = !!profile && !!nextId && isLessonUnlocked(stars, profile.id, nextId)
  const nextLesson = nextId ? LESSON_BY_ID.get(nextId) : undefined

  return (
    <div className="relative mx-auto flex min-h-full max-w-md flex-col items-center justify-center gap-6 px-6 py-10 text-center">
      <Burst count={18} />

      <motion.div
        initial={{ scale: 0.4, rotate: -12 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 13 }}
      >
        <Emoji value={lesson.icon} size="xl" />
      </motion.div>

      <div>
        <h1 className="text-3xl font-black">Cały dzień zrobiony!</h1>
        <p className="mt-1 font-bold text-ink-soft">
          {lesson.day} · {lesson.title}
        </p>
      </div>

      <Stars count={result.stars} size="lg" />

      {/* Ocena ze sprawdzianu — to ona decyduje o gwiazdkach za dzień. */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 240, damping: 15 }}
        className={`flex w-full items-center justify-center gap-4 rounded-3xl px-5 py-4 ${GRADE_TONE[result.grade]}`}
      >
        <span className="text-6xl font-black">{result.grade}</span>
        <span className="text-left">
          <span className="block text-sm font-black tracking-wide uppercase opacity-70">
            Sprawdzian
          </span>
          <span className="block text-xl font-black">{result.gradeLabel}</span>
          <span className="block text-sm font-bold opacity-80">
            {result.testCorrect} / {result.testTotal} poprawnie
          </span>
        </span>
      </motion.div>

      <div className="grid w-full grid-cols-2 gap-3">
        <Box label="XP" value={`+${result.xp}`} />
        <Box label="Kryształy" value={`+${result.crystals}`} />
      </div>

      {result.grade <= 2 && (
        <p className="rounded-2xl bg-amber-100 px-4 py-2 text-sm font-bold">
          Ten dzień warto powtórzyć — wróć tu jutro i sprawdzian pójdzie lepiej.
        </p>
      )}

      {result.levelUp && (
        <motion.p
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-2xl bg-violet-600 px-5 py-3 text-xl font-black text-white"
        >
          Nowy poziom! 🎉
        </motion.p>
      )}

      <div className="flex w-full flex-col gap-3">
        {nextUnlocked && nextLesson && (
          <PrimaryButton onClick={() => onNext(nextId)}>
            Dalej: {nextLesson.day} · {nextLesson.title}
          </PrimaryButton>
        )}
        <PrimaryButton tone="slate" onClick={onMap}>
          Wróć na mapę
        </PrimaryButton>
      </div>
    </div>
  )
}

/** Kolor oceny: bez czerwieni dla 3 — dostateczny to nadal zaliczone. */
const GRADE_TONE: Record<number, string> = {
  6: 'bg-emerald-400 text-white',
  5: 'bg-emerald-300 text-emerald-950',
  4: 'bg-lime-200 text-lime-950',
  3: 'bg-amber-200 text-amber-950',
  2: 'bg-orange-200 text-orange-950',
  1: 'bg-rose-200 text-rose-950',
}

function Box({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/80 px-2 py-3">
      <p className="text-2xl font-black">{value}</p>
      <p className="text-xs font-extrabold text-ink-soft">{label}</p>
    </div>
  )
}
