import { useState } from 'react'
import type { MathTask } from '../types'
import type { ExerciseProps } from './common'
import { PROMPTS } from './common'
import { NUMBER_WORDS } from '../content/words'
import { SpeakerButton, Tile } from '../ui/kit'

/** „two plus three = …" — Karta pracy 1A, zadanie 3. Liczby ćwiczą się same przy okazji. */
export function MathQuiz({ task, say, onAnswer }: ExerciseProps<MathTask>) {
  const [picked, setPicked] = useState<string | null>(null)

  const spoken = `${NUMBER_WORDS[task.a - 1]} ${task.op === '+' ? 'plus' : 'minus'} ${NUMBER_WORDS[task.b - 1]}`

  function choose(option: string) {
    if (picked) return
    setPicked(option)
    if (option === task.answer) say(`${spoken} is ${task.answer}`)
    onAnswer(option === task.answer, task.answer)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-lg font-bold text-ink-soft">{PROMPTS.math}</p>

      <div className="flex w-full flex-col items-center gap-3 rounded-3xl bg-white/70 px-4 py-8">
        <p className="text-3xl font-black">
          {NUMBER_WORDS[task.a - 1]} {task.op} {NUMBER_WORDS[task.b - 1]} ={' '}
          <span className={picked ? 'text-emerald-600' : 'text-violet-400'}>
            {picked === task.answer ? task.answer : '?'}
          </span>
        </p>
        <p className="text-lg font-extrabold text-ink-soft">
          {task.a} {task.op} {task.b} = ?
        </p>
        <SpeakerButton onClick={() => say(spoken)} />
      </div>

      <div className="grid w-full grid-cols-2 gap-3">
        {task.options.map((opt) => (
          <Tile
            key={opt}
            disabled={!!picked}
            state={
              !picked ? 'idle' : opt === task.answer ? 'correct' : opt === picked ? 'wrong' : 'muted'
            }
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
