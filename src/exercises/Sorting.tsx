import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import type { SortingTask } from '../types'
import type { ExerciseProps } from './common'
import { PROMPTS } from './common'
import { play } from '../audio/sfx'
import { Asset } from '../ui/kit'

/**
 * Sortowanie do koszyków. Elementy lecą pojedynczo, a dziecko stuka koszyk —
 * dzięki temu nie ma przeciągania, które na tablecie zawsze kończy się zgubionym elementem.
 */
export function Sorting({ task, say, onAnswer }: ExerciseProps<SortingTask>) {
  const [index, setIndex] = useState(0)
  const [flash, setFlash] = useState<{ key: string; ok: boolean } | null>(null)
  const mistakes = useRef(0)
  const finished = useRef(false)

  const current = task.items[index]

  function drop(bucketKey: string) {
    if (!current || flash || finished.current) return
    const ok = bucketKey === current.bucketKey
    if (ok) {
      play('match')
      say(current.word.en)
    } else {
      play('wrong')
      mistakes.current++
    }
    setFlash({ key: bucketKey, ok })

    setTimeout(() => {
      setFlash(null)
      if (index + 1 >= task.items.length) {
        finished.current = true
        onAnswer(mistakes.current <= 1, '')
      } else {
        setIndex(index + 1)
      }
    }, 550)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-lg font-bold text-ink-soft">{PROMPTS.sorting}</p>

      <div className="flex min-h-40 flex-col items-center justify-center gap-2">
        {current && (
          <motion.div
            key={current.word.id}
            initial={{ scale: 0.5, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            className="flex flex-col items-center gap-1"
          >
            <Asset value={current.word.asset} size="xl" />
            <span className="text-2xl font-black">{current.word.en}</span>
          </motion.div>
        )}
      </div>

      <div className={`grid w-full gap-3 ${task.buckets.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {task.buckets.map((b) => {
          const isFlash = flash?.key === b.key
          const tone = isFlash
            ? flash.ok
              ? 'bg-emerald-400 text-white [--chunky-shadow:var(--color-emerald-600)]'
              : 'bg-rose-300 [--chunky-shadow:var(--color-rose-500)]'
            : 'bg-white [--chunky-shadow:var(--color-slate-300)]'
          return (
            <button
              key={b.key}
              type="button"
              disabled={!!flash}
              onClick={() => drop(b.key)}
              className={`chunky chunky-press flex min-h-24 flex-col items-center justify-center gap-1 rounded-2xl border-2 border-slate-200 px-2 py-3 ${tone}`}
            >
              <span className="text-3xl">{b.icon}</span>
              <span className="text-sm leading-tight font-extrabold">{b.label}</span>
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
