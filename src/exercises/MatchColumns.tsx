import { useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'
import type { MatchTask } from '../types'
import type { ExerciseProps } from './common'
import { PROMPTS } from './common'
import { play } from '../audio/sfx'
import { shuffle, shuffleDifferent } from '../engine/random'
import { Asset } from '../ui/kit'

type Side = 'l' | 'r'
interface Selection {
  side: Side
  id: string
}

/**
 * „Połącz słowo z polskim znaczeniem" — zadanie żywcem z kart pracy 1A, 2A i 3A.
 * Stukamy element z jednej kolumny, potem z drugiej. Bez linii, bez przeciągania.
 *
 * Po nietrafionej parze zaznaczenie ZOSTAJE — inaczej dziecko musiałoby stukać
 * ten sam element od nowa przy każdej próbie.
 */
export function MatchColumns({ task, say, onAnswer }: ExerciseProps<MatchTask>) {
  const left = useMemo(() => shuffle(task.pairs), [task.key, task.pairs])
  const right = useMemo(() => shuffleDifferent(task.pairs), [task.key, task.pairs])

  const [sel, setSel] = useState<Selection | null>(null)
  const [done, setDone] = useState<string[]>([])
  const [wrong, setWrong] = useState<Selection | null>(null)
  const mistakes = useRef(0)
  const finished = useRef(false)

  const wordOf = (id: string) => task.pairs.find((w) => w.id === id)!

  function tap(side: Side, id: string) {
    if (done.includes(id) || finished.current) return

    // Nic nie wybrane albo stuknięcie w tej samej kolumnie — po prostu zmieniamy wybór.
    if (!sel || sel.side === side) {
      play('tap')
      setSel(sel?.id === id && sel.side === side ? null : { side, id })
      if (side === 'l' && task.variant === 'en-pl') say(wordOf(id).en)
      return
    }

    if (sel.id === id) {
      play('match')
      const next = [...done, id]
      setDone(next)
      setSel(null)
      say(wordOf(id).en)
      if (next.length === task.pairs.length) {
        finished.current = true
        setTimeout(() => onAnswer(mistakes.current <= 1, ''), 300)
      }
      return
    }

    play('wrong')
    mistakes.current++
    setWrong({ side, id })
    setTimeout(() => setWrong(null), 450)
  }

  const leftFace = task.variant === 'pic-en' ? 'asset' : 'en'
  const rightFace = task.variant === 'pic-en' ? 'en' : 'pl'

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-lg font-bold text-ink-soft">{PROMPTS.match}</p>

      <div className="grid w-full grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          {left.map((w) => (
            <Cell
              key={w.id}
              matched={done.includes(w.id)}
              active={sel?.side === 'l' && sel.id === w.id}
              wrong={wrong?.side === 'l' && wrong.id === w.id}
              onClick={() => tap('l', w.id)}
            >
              {leftFace === 'asset' ? (
                <Asset value={w.asset} size="md" />
              ) : (
                <span className="text-lg leading-tight font-extrabold">{w.en}</span>
              )}
            </Cell>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {right.map((w) => (
            <Cell
              key={w.id}
              matched={done.includes(w.id)}
              active={sel?.side === 'r' && sel.id === w.id}
              wrong={wrong?.side === 'r' && wrong.id === w.id}
              onClick={() => tap('r', w.id)}
            >
              <span className="text-base leading-tight font-extrabold">
                {rightFace === 'en' ? w.en : w.pl}
              </span>
            </Cell>
          ))}
        </div>
      </div>

      <p className="text-sm font-bold text-ink-soft">
        Połączone: {done.length} / {task.pairs.length}
      </p>
    </div>
  )
}

function Cell({
  children,
  matched,
  active,
  wrong,
  onClick,
}: {
  children: React.ReactNode
  matched: boolean
  active: boolean
  wrong: boolean
  onClick: () => void
}) {
  const tone = matched
    ? 'bg-emerald-400 text-white border-emerald-500 [--chunky-shadow:var(--color-emerald-600)]'
    : wrong
      ? 'bg-rose-200 border-rose-400 [--chunky-shadow:var(--color-rose-400)]'
      : active
        ? 'bg-violet-200 border-violet-500 [--chunky-shadow:var(--color-violet-500)]'
        : 'bg-white border-slate-200 [--chunky-shadow:var(--color-slate-300)]'

  return (
    <motion.button
      type="button"
      animate={wrong ? { x: [0, -7, 7, -5, 0] } : { x: 0 }}
      transition={{ duration: 0.32 }}
      disabled={matched}
      onClick={onClick}
      className={`chunky chunky-press grid min-h-16 place-items-center rounded-2xl border-2 px-2 py-2 text-center ${tone}`}
    >
      {children}
    </motion.button>
  )
}
