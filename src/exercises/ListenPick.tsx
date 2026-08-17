import { useEffect, useState } from 'react'
import type { ListenPickTask } from '../types'
import type { ExerciseProps } from './common'
import { PROMPTS } from './common'
import { Asset, SpeakerButton, Tile } from '../ui/kit'

export function ListenPick({ task, say, onAnswer }: ExerciseProps<ListenPickTask>) {
  const [picked, setPicked] = useState<string | null>(null)

  // Dziecko ma najpierw usłyszeć — dopiero potem szuka wzrokiem.
  useEffect(() => {
    const t = setTimeout(() => say(task.word.en), 250)
    return () => clearTimeout(t)
  }, [task.key, say, task.word.en])

  function choose(id: string) {
    if (picked) return
    setPicked(id)
    onAnswer(id === task.word.id, task.word.en)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-lg font-bold text-ink-soft">{PROMPTS.listenPick}</p>

      <SpeakerButton big onClick={() => say(task.word.en)} />

      <div className="grid w-full grid-cols-3 gap-3">
        {task.options.map((w) => (
          <Tile
            key={w.id}
            disabled={!!picked}
            state={
              !picked
                ? 'idle'
                : w.id === task.word.id
                  ? 'correct'
                  : w.id === picked
                    ? 'wrong'
                    : 'muted'
            }
            className="flex-col gap-1 py-4"
            onClick={() => choose(w.id)}
          >
            <Asset value={w.asset} size="md" />
            <span className="text-xs leading-tight font-bold opacity-70">{w.pl}</span>
          </Tile>
        ))}
      </div>
    </div>
  )
}
