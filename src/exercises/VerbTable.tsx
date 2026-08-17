import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import type { Tense, VerbTableTask } from '../types'
import type { ExerciseProps } from './common'
import { PROMPTS } from './common'
import { TENSE_LABEL } from '../content/verbs'
import { play } from '../audio/sfx'
import { Asset, SpeakerButton } from '../ui/kit'
import { Emoji } from '../ui/Emoji'

const SLOTS: { tense: Tense; label: string; example: string }[] = [
  { tense: 'present', label: 'on / ona', example: 'He ___' },
  { tense: 'continuous', label: 'teraz', example: 'He is ___' },
  { tense: 'past', label: 'wczoraj', example: 'He ___' },
]

/** Klasyczna tabelka odmiany: trzy formy jednego czasownika naraz. */
export function VerbTable({ task, say, onAnswer }: ExerciseProps<VerbTableTask>) {
  const correct: Record<Tense, string> = {
    present: task.verb.third,
    continuous: task.verb.ing,
    past: task.verb.past,
  }

  const [filled, setFilled] = useState<Partial<Record<Tense, string>>>({})
  const [used, setUsed] = useState<string[]>([])
  const [verdict, setVerdict] = useState<null | 'correct' | 'wrong'>(null)
  const [active, setActive] = useState<Tense>('present')
  const mistakes = useRef(0)

  function tapTile(form: string) {
    if (verdict || used.includes(form)) return

    if (form === correct[active]) {
      play('match')
      const next = { ...filled, [active]: form }
      setFilled(next)
      setUsed((u) => [...u, form])
      const remaining = SLOTS.map((s) => s.tense).filter((t) => !next[t])
      if (remaining.length === 0) {
        setVerdict(mistakes.current <= 1 ? 'correct' : 'wrong')
        say(`${task.verb.base}, ${task.verb.third}, ${task.verb.ing}, ${task.verb.past}`)
        setTimeout(() => onAnswer(mistakes.current <= 1, formsLine(task)), 400)
      } else {
        setActive(remaining[0])
      }
    } else {
      play('wrong')
      mistakes.current++
    }
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-lg font-bold text-ink-soft">{PROMPTS.verbTable}</p>

      <div className="flex items-center gap-3">
        <Asset value={task.word.asset} size="md" />
        <div className="text-left">
          <p className="text-2xl font-black">{task.verb.base}</p>
          <p className="text-sm font-bold text-ink-soft">{task.word.pl}</p>
        </div>
        <SpeakerButton onClick={() => say(task.verb.base)} />
      </div>

      <div className="flex w-full flex-col gap-2">
        {SLOTS.map((slot) => {
          const value = filled[slot.tense]
          const isActive = !verdict && active === slot.tense
          return (
            <div
              key={slot.tense}
              className={`flex items-center gap-3 rounded-2xl border-2 px-3 py-2.5 ${
                value
                  ? 'border-emerald-400 bg-emerald-50'
                  : isActive
                    ? 'border-violet-500 bg-violet-50'
                    : 'border-slate-200 bg-white/70'
              }`}
            >
              <span className="flex w-24 shrink-0 items-center gap-1 text-sm font-black text-ink-soft">
                <Emoji value={TENSE_LABEL[slot.tense].icon} size="xs" /> {slot.label}
              </span>
              <span className="flex-1 text-lg font-extrabold">
                {slot.example.replace('___', '')}
                <span className={value ? '' : 'text-violet-300'}>{value ?? '________'}</span>
              </span>
            </div>
          )
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {task.pool.map((form) => (
          <motion.button
            key={form}
            type="button"
            layout
            disabled={!!verdict || used.includes(form)}
            onClick={() => tapTile(form)}
            className={`chunky chunky-press rounded-xl border-2 px-3 py-2.5 text-base font-extrabold ${
              used.includes(form)
                ? 'border-emerald-300 bg-emerald-100 text-emerald-700 opacity-50'
                : 'border-slate-200 bg-white [--chunky-shadow:var(--color-slate-300)]'
            }`}
          >
            {form}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function formsLine(task: VerbTableTask): string {
  return `${task.verb.base} · ${task.verb.third} · ${task.verb.ing} · ${task.verb.past}`
}
