import { useState } from 'react'
import type { PictureQuizTask } from '../types'
import type { ExerciseProps } from './common'
import { PROMPTS } from './common'
import { Asset, SpeakerButton, Tile } from '../ui/kit'

export function PictureQuiz({ task, say, onAnswer }: ExerciseProps<PictureQuizTask>) {
  const [picked, setPicked] = useState<string | null>(null)
  const { word, mode, options } = task

  function choose(id: string) {
    if (picked) return
    setPicked(id)
    onAnswer(id === word.id, word.en)
  }

  const stateOf = (id: string) =>
    !picked ? 'idle' : id === word.id ? 'correct' : id === picked ? 'wrong' : 'muted'

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-lg font-bold text-ink-soft">{PROMPTS[mode]}</p>

      {/* Polecenie */}
      <div className="flex min-h-32 w-full flex-col items-center justify-center gap-3 rounded-3xl bg-white/70 px-4 py-6">
        {mode === 'pic2word' && <Asset value={word.asset} size="xl" />}
        {mode === 'word2pic' && (
          <div className="flex items-center gap-4">
            <span className="text-4xl font-extrabold">{word.en}</span>
            <SpeakerButton onClick={() => say(word.en)} />
          </div>
        )}
        {mode === 'pl2word' && (
          <>
            <span className="text-3xl font-extrabold text-center">{word.pl}</span>
            <Asset value={word.asset} size="sm" />
          </>
        )}
      </div>

      {/* Odpowiedzi */}
      {mode === 'word2pic' ? (
        <div className="grid w-full grid-cols-3 gap-3">
          {options.map((w) => (
            <Tile key={w.id} disabled={!!picked} state={stateOf(w.id)} className="py-5" onClick={() => choose(w.id)}>
              <Asset value={w.asset} size="md" />
            </Tile>
          ))}
        </div>
      ) : (
        <div className="grid w-full grid-cols-2 gap-3">
          {options.map((w) => (
            <Tile
              key={w.id}
              disabled={!!picked}
              state={stateOf(w.id)}
              className="text-lg"
              onClick={() => choose(w.id)}
            >
              {w.en}
            </Tile>
          ))}
        </div>
      )}
    </div>
  )
}
