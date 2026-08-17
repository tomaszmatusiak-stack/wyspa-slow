import { useState } from 'react'
import type { OddOneOutTask } from '../types'
import type { ExerciseProps } from './common'
import { PROMPTS } from './common'
import { Asset, Tile } from '../ui/kit'

/** Które nie pasuje — ćwiczy kategorie, czyli to, na czym opiera się cała reszta słownictwa. */
export function OddOneOut({ task, say, onAnswer }: ExerciseProps<OddOneOutTask>) {
  const [picked, setPicked] = useState<string | null>(null)

  function choose(id: string) {
    if (picked) return
    setPicked(id)
    const odd = task.items.find((w) => w.id === task.oddId)!
    if (id === task.oddId) say(odd.en)
    onAnswer(id === task.oddId, odd.en)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-lg font-bold text-ink-soft">{PROMPTS.oddOne}</p>
      <p className="rounded-full bg-white/80 px-4 py-2 text-xl font-black">{task.categoryLabel}</p>

      <div className="grid w-full grid-cols-2 gap-3">
        {task.items.map((w) => (
          <Tile
            key={w.id}
            disabled={!!picked}
            state={
              !picked ? 'idle' : w.id === task.oddId ? 'correct' : w.id === picked ? 'wrong' : 'muted'
            }
            className="flex-col gap-1 py-4"
            onClick={() => choose(w.id)}
          >
            <Asset value={w.asset} size="md" />
            <span className="text-sm leading-tight font-extrabold">{w.en}</span>
          </Tile>
        ))}
      </div>
    </div>
  )
}
