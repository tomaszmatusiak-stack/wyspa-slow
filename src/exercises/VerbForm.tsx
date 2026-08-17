import { useState } from 'react'
import type { VerbFormTask } from '../types'
import type { ExerciseProps } from './common'
import { PROMPTS } from './common'
import { TENSE_LABEL } from '../content/verbs'
import { Asset, SpeakerButton, Tile } from '../ui/kit'
import { Emoji } from '../ui/Emoji'

/** „He ___ football every day." — wybierz właściwą formę czasownika. */
export function VerbForm({ task, say, onAnswer }: ExerciseProps<VerbFormTask>) {
  const [picked, setPicked] = useState<string | null>(null)
  const tense = TENSE_LABEL[task.tense]
  const solved = task.prompt.replace('___', task.answer)

  function choose(option: string) {
    if (picked) return
    setPicked(option)
    if (option === task.answer) say(solved)
    onAnswer(option === task.answer, solved)
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-lg font-bold text-ink-soft">{PROMPTS.verbForm}</p>

      <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5">
        <Emoji value={tense.icon} size="xs" />
        <span className="font-black">{tense.pl}</span>
        <span className="text-xs font-bold text-ink-soft">· {tense.hint}</span>
      </div>

      <div className="flex w-full flex-col items-center gap-3 rounded-3xl bg-white/70 px-4 py-6">
        <div className="flex items-center gap-3">
          <Asset value={task.word.asset} size="md" />
          <div className="text-left">
            <p className="text-xl font-black">{task.verb.base}</p>
            <p className="text-sm font-bold text-ink-soft">{task.word.pl}</p>
          </div>
        </div>

        <p className="text-center text-2xl font-extrabold">
          {task.prompt.split('___')[0]}
          <span
            className={`mx-1 rounded-lg border-b-4 px-2 ${
              picked
                ? picked === task.answer
                  ? 'border-emerald-500 text-emerald-700'
                  : 'border-rose-400 text-rose-700'
                : 'border-violet-400 text-violet-400'
            }`}
          >
            {picked ?? '?'}
          </span>
          {task.prompt.split('___')[1]}
        </p>

        {picked && <SpeakerButton onClick={() => say(solved)} />}
      </div>

      <div className="grid w-full grid-cols-3 gap-3">
        {task.options.map((opt) => (
          <Tile
            key={opt}
            disabled={!!picked}
            state={
              !picked ? 'idle' : opt === task.answer ? 'correct' : opt === picked ? 'wrong' : 'muted'
            }
            className="text-base"
            onClick={() => choose(opt)}
          >
            {opt}
          </Tile>
        ))}
      </div>
    </div>
  )
}
