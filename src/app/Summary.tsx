import { motion } from 'motion/react'
import type { LessonResult } from './LessonScreen'
import { LESSON_BY_ID, LESSON_ORDER } from '../content/worlds'
import { isLessonUnlocked, useActiveProfile, useGame } from '../store/useGame'
import { Burst, PrimaryButton, Stars } from '../ui/kit'

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
        className="text-7xl"
      >
        {lesson.icon}
      </motion.div>

      <div>
        <h1 className="text-3xl font-black">Cały dzień zrobiony!</h1>
        <p className="mt-1 font-bold text-ink-soft">
          {lesson.day} · {lesson.title}
        </p>
      </div>

      <Stars count={result.stars} size="lg" />

      <div className="grid w-full grid-cols-3 gap-3">
        <Box label="XP" value={`+${result.xp}`} />
        <Box label="Kryształy" value={`+${result.crystals}`} />
        <Box
          label="Trafione"
          value={`${Math.round((1 - result.errors / Math.max(1, result.tasks)) * 100)}%`}
        />
      </div>

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

function Box({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/80 px-2 py-3">
      <p className="text-2xl font-black">{value}</p>
      <p className="text-xs font-extrabold text-ink-soft">{label}</p>
    </div>
  )
}
