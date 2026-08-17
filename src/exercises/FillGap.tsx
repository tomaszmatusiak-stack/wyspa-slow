import { useState } from 'react'
import type { FillGapTask } from '../types'
import type { ExerciseProps } from './common'
import { PROMPTS } from './common'
import { SpeakerButton, Tile } from '../ui/kit'

/** „Uzupełnij zdania słowami z banku" — Karta pracy 2B i 3A, tylko szybciej. */
export function FillGap({ task, say, onAnswer }: ExerciseProps<FillGapTask>) {
  const [picked, setPicked] = useState<string | null>(null)
  const correct = task.sentence.tokens[task.gapIndex]

  function choose(option: string) {
    if (picked) return
    setPicked(option)
    if (option === correct) say(task.sentence.en)
    onAnswer(option === correct, task.sentence.en)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-lg font-bold text-ink-soft">{PROMPTS.fillGap}</p>

      <div className="flex w-full flex-col items-center gap-3 rounded-3xl bg-white/70 px-4 py-6">
        <p className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 text-center text-2xl font-extrabold">
          {task.sentence.tokens.map((t, i) =>
            i === task.gapIndex ? (
              <span
                key={i}
                className={`min-w-20 rounded-lg border-b-4 px-2 ${
                  picked
                    ? picked === correct
                      ? 'border-emerald-500 text-emerald-700'
                      : 'border-rose-400 text-rose-700'
                    : 'border-violet-400 text-violet-400'
                }`}
              >
                {picked ?? '?'}
              </span>
            ) : (
              <span key={i}>{t}</span>
            ),
          )}
        </p>
        <p className="text-base font-bold text-ink-soft">{task.sentence.pl}</p>
        {picked && <SpeakerButton onClick={() => say(task.sentence.en)} />}
      </div>

      <div className="grid w-full grid-cols-3 gap-3">
        {task.options.map((opt) => (
          <Tile
            key={opt}
            disabled={!!picked}
            state={!picked ? 'idle' : opt === correct ? 'correct' : opt === picked ? 'wrong' : 'muted'}
            className="text-lg"
            onClick={() => choose(opt)}
          >
            {opt}
          </Tile>
        ))}
      </div>
    </div>
  )
}
