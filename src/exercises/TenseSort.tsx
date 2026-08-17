import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import type { Tense, TenseSortTask } from '../types'
import type { ExerciseProps } from './common'
import { PROMPTS } from './common'
import { TENSE_LABEL } from '../content/verbs'
import { play } from '../audio/sfx'
import { SpeakerButton } from '../ui/kit'

const BUCKETS: Tense[] = ['present', 'continuous', 'past']

/**
 * „Kiedy to się dzieje?" — zdanie leci pojedynczo, dziecko wskazuje czas.
 * Markery („every day", „now", „yesterday") są w zdaniu celowo: rozpoznanie,
 * że wczoraj = past simple, jest dokładnie tą umiejętnością, o którą tu chodzi.
 */
export function TenseSort({ task, say, onAnswer }: ExerciseProps<TenseSortTask>) {
  const [index, setIndex] = useState(0)
  const [flash, setFlash] = useState<{ tense: Tense; ok: boolean } | null>(null)
  const mistakes = useRef(0)
  const finished = useRef(false)

  const current = task.items[index]

  function choose(tense: Tense) {
    if (!current || flash || finished.current) return
    const ok = tense === current.tense
    if (ok) {
      play('match')
      say(current.sentence)
    } else {
      play('wrong')
      mistakes.current++
    }
    setFlash({ tense, ok })

    setTimeout(() => {
      setFlash(null)
      if (index + 1 >= task.items.length) {
        finished.current = true
        onAnswer(mistakes.current <= 1, '')
      } else {
        setIndex(index + 1)
      }
    }, 620)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-lg font-bold text-ink-soft">{PROMPTS.tenseSort}</p>

      <div className="flex min-h-32 w-full items-center justify-center gap-3 rounded-3xl bg-white/70 px-4 py-6">
        {current && (
          <motion.p
            key={index}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center text-2xl font-extrabold"
          >
            {current.sentence}
          </motion.p>
        )}
        {current && <SpeakerButton onClick={() => say(current.sentence)} />}
      </div>

      <div className="grid w-full grid-cols-3 gap-3">
        {BUCKETS.map((tense) => {
          const meta = TENSE_LABEL[tense]
          const isFlash = flash?.tense === tense
          const tone = isFlash
            ? flash.ok
              ? 'bg-emerald-400 text-white [--chunky-shadow:var(--color-emerald-600)]'
              : 'bg-rose-300 [--chunky-shadow:var(--color-rose-500)]'
            : 'bg-white [--chunky-shadow:var(--color-slate-300)]'
          return (
            <button
              key={tense}
              type="button"
              disabled={!!flash}
              onClick={() => choose(tense)}
              className={`chunky chunky-press flex min-h-24 flex-col items-center justify-center gap-1 rounded-2xl border-2 border-slate-200 px-1 py-3 ${tone}`}
            >
              <span className="text-3xl">{meta.icon}</span>
              <span className="text-sm leading-tight font-extrabold">{meta.pl}</span>
            </button>
          )
        })}
      </div>

      <p className="text-sm font-bold text-ink-soft">
        {Math.min(index + 1, task.items.length)} / {task.items.length}
      </p>
    </div>
  )
}
