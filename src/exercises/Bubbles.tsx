import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import type { BubblesTask } from '../types'
import type { ExerciseProps } from './common'
import { PROMPTS } from './common'
import { play } from '../audio/sfx'
import { Asset } from '../ui/kit'

/**
 * Złap właściwe słowa. Jedyne zadanie „na ruch" w lekcji — stoi w środku rundy,
 * żeby rozładować napięcie po zadaniach wymagających myślenia.
 */
export function Bubbles({ task, say, onAnswer }: ExerciseProps<BubblesTask>) {
  const [popped, setPopped] = useState<string[]>([])
  const [missed, setMissed] = useState<string[]>([])
  const mistakes = useRef(0)
  const finished = useRef(false)

  function tap(id: string) {
    if (popped.includes(id) || missed.includes(id) || finished.current) return

    if (task.targetIds.includes(id)) {
      play('match')
      const next = [...popped, id]
      setPopped(next)
      say(task.items.find((w) => w.id === id)!.en)
      if (next.length === task.targetIds.length) {
        finished.current = true
        setTimeout(() => onAnswer(mistakes.current <= 1, ''), 350)
      }
    } else {
      play('wrong')
      mistakes.current++
      setMissed((m) => [...m, id])
      setTimeout(() => setMissed((m) => m.filter((x) => x !== id)), 600)
    }
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-lg font-bold text-ink-soft">{PROMPTS.bubbles}</p>
      <p className="rounded-full bg-amber-300 px-5 py-2 text-xl font-black">{task.label}</p>

      <div className="grid w-full grid-cols-3 gap-3">
        {task.items.map((w, i) => {
          const isPopped = popped.includes(w.id)
          const isMissed = missed.includes(w.id)
          return (
            <motion.button
              key={w.id}
              type="button"
              disabled={isPopped}
              onClick={() => tap(w.id)}
              animate={
                isPopped
                  ? { scale: 0.2, opacity: 0 }
                  : isMissed
                    ? { x: [0, -8, 8, -6, 0], scale: 1 }
                    : { y: [0, -5, 0], scale: 1, opacity: 1 }
              }
              transition={
                isPopped || isMissed
                  ? { duration: 0.35 }
                  : { duration: 2.4 + (i % 4) * 0.35, repeat: Infinity, ease: 'easeInOut' }
              }
              className={`chunky flex aspect-square flex-col items-center justify-center gap-0.5 rounded-full border-2 px-1 ${
                isMissed
                  ? 'border-rose-400 bg-rose-200 [--chunky-shadow:var(--color-rose-400)]'
                  : 'border-sky-200 bg-white [--chunky-shadow:var(--color-sky-300)]'
              }`}
            >
              <Asset value={w.asset} size="sm" />
              <span className="text-xs leading-none font-extrabold break-words">{w.en}</span>
            </motion.button>
          )
        })}
      </div>

      <p className="text-sm font-bold text-ink-soft">
        Znalezione: {popped.length} / {task.targetIds.length}
      </p>
    </div>
  )
}
