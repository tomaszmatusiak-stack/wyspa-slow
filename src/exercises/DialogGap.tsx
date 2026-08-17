import { useState } from 'react'
import type { DialogTask } from '../types'
import type { ExerciseProps } from './common'
import { PROMPTS } from './common'
import { SpeakerButton, Tile } from '../ui/kit'

/**
 * Sucha próba przed piątkową scenką z pakietu: dziecko widzi całą rozmowę
 * z jedną wyciętą kwestią i musi ją odtworzyć.
 */
export function DialogGap({ task, say, onAnswer }: ExerciseProps<DialogTask>) {
  const [picked, setPicked] = useState<string | null>(null)
  const correct = task.dialog.lines[task.hiddenIndex].en

  function choose(option: string) {
    if (picked) return
    setPicked(option)
    if (option === correct) say(correct)
    onAnswer(option === correct, correct)
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="text-center text-lg font-bold text-ink-soft">{PROMPTS.dialog}</p>
      <p className="text-center text-sm font-bold text-ink-soft">Dialog: {task.dialog.title}</p>

      <div className="flex flex-col gap-2 rounded-3xl bg-white/70 p-3">
        {task.dialog.lines.map((line, i) => {
          const hidden = i === task.hiddenIndex
          const mine = line.who === 'B'
          if (hidden && !picked) {
            return (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl border-2 border-dashed border-violet-300 bg-violet-50 px-3 py-3 text-xl font-black text-violet-400 ${mine ? 'self-end' : 'self-start'}`}
              >
                ???
              </div>
            )
          }
          const revealed = hidden && picked
          return (
            <div
              key={i}
              className={`flex max-w-[90%] items-center gap-2 rounded-2xl px-3 py-2 ${
                mine ? 'self-end bg-violet-100' : 'self-start bg-slate-100'
              } ${revealed ? 'ring-2 ring-emerald-400' : ''}`}
            >
              <div className="min-w-0">
                <p className="text-base leading-snug font-extrabold">{line.en}</p>
                <p className="text-xs font-bold text-ink-soft">{line.pl}</p>
              </div>
              <SpeakerButton onClick={() => say(line.en)} />
            </div>
          )
        })}
      </div>

      <div className="flex flex-col gap-2">
        {task.options.map((opt) => (
          <Tile
            key={opt}
            disabled={!!picked}
            state={!picked ? 'idle' : opt === correct ? 'correct' : opt === picked ? 'wrong' : 'muted'}
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
