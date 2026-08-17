import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import type { DialogOrderTask } from '../types'
import type { ExerciseProps } from './common'
import { PROMPTS } from './common'
import { play } from '../audio/sfx'
import { SpeakerButton } from '../ui/kit'

/**
 * Ułóż rozmowę po kolei — druga forma ćwiczenia na tym samym dialogu, bez nowego materiału.
 *
 * Dziecko wskazuje kolejne kwestie, a nie przeciąga je w dowolne miejsce: przy błędzie
 * kwestia po prostu zostaje w puli, więc nie da się zabrnąć w układ, z którego trudno wyjść.
 * Pierwsza kwestia jest dana jako punkt zaczepienia.
 */
export function DialogOrder({ task, say, onAnswer }: ExerciseProps<DialogOrderTask>) {
  const [placed, setPlaced] = useState<number[]>([])
  const [wrong, setWrong] = useState<number | null>(null)
  const mistakes = useRef(0)
  const finished = useRef(false)

  const remaining = task.shuffled.filter((i) => !placed.includes(i))
  const nextIndex = placed.length + 1

  function tap(index: number) {
    if (finished.current) return

    if (index === nextIndex) {
      play('match')
      say(task.dialog.lines[index].en)
      const next = [...placed, index]
      setPlaced(next)
      if (next.length === task.shuffled.length) {
        finished.current = true
        setTimeout(() => onAnswer(mistakes.current <= 1, ''), 400)
      }
    } else {
      play('wrong')
      mistakes.current++
      setWrong(index)
      setTimeout(() => setWrong(null), 450)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-center text-lg font-bold text-ink-soft">{PROMPTS.dialogOrder}</p>
      <p className="text-center text-sm font-bold text-ink-soft">Dialog: {task.dialog.title}</p>

      {/* Ułożona część rozmowy */}
      <div className="flex flex-col gap-2 rounded-3xl bg-white/70 p-3">
        <Line index={0} task={task} step={1} say={say} />
        {placed.map((i, n) => (
          <Line key={i} index={i} task={task} step={n + 2} say={say} />
        ))}
        {remaining.length > 0 && (
          <div className="self-center rounded-xl border-2 border-dashed border-violet-300 px-4 py-1.5 text-sm font-black text-violet-400">
            {nextIndex + 1}. co dalej?
          </div>
        )}
      </div>

      {/* Kwestie do wybrania */}
      <div className="flex flex-col gap-2">
        {remaining.map((i) => {
          const line = task.dialog.lines[i]
          return (
            <motion.button
              key={i}
              type="button"
              layout
              animate={wrong === i ? { x: [0, -7, 7, -5, 0] } : { x: 0 }}
              transition={{ duration: 0.32 }}
              onClick={() => tap(i)}
              className={`chunky chunky-press rounded-2xl border-2 px-3 py-2.5 text-left ${
                wrong === i
                  ? 'border-rose-400 bg-rose-200 [--chunky-shadow:var(--color-rose-400)]'
                  : 'border-slate-200 bg-white [--chunky-shadow:var(--color-slate-300)]'
              }`}
            >
              <span className="flex items-start gap-2">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-slate-200 text-xs font-black">
                  {line.who}
                </span>
                <span className="min-w-0">
                  <span className="block text-base leading-snug font-extrabold">{line.en}</span>
                  <span className="block text-xs font-bold text-ink-soft">{line.pl}</span>
                </span>
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

function Line({
  index,
  task,
  step,
  say,
}: {
  index: number
  task: DialogOrderTask
  step: number
  say: (t: string) => void
}) {
  const line = task.dialog.lines[index]
  const mine = line.who === 'B'
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex max-w-[92%] items-center gap-2 rounded-2xl px-3 py-2 ${
        mine ? 'self-end bg-violet-100' : 'self-start bg-emerald-100'
      }`}
    >
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/80 text-xs font-black">
        {step}
      </span>
      <span className="min-w-0">
        <span className="block text-base leading-snug font-extrabold">{line.en}</span>
        <span className="block text-xs font-bold text-ink-soft">{line.pl}</span>
      </span>
      <SpeakerButton onClick={() => say(line.en)} />
    </motion.div>
  )
}
