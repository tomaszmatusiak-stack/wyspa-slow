import { useState } from 'react'
import { motion } from 'motion/react'
import type { SentenceTask } from '../types'
import type { ExerciseProps } from './common'
import { PROMPTS } from './common'
import { PrimaryButton, SpeakerButton } from '../ui/kit'

interface Token {
  uid: string
  text: string
}

/**
 * Układanie przez dotknięcie, nie przeciąganie: klocek "leci" między rzędami
 * dzięki animacji layout. Działa identycznie myszą i palcem, a 8-latek nie gubi klocka po drodze.
 */
export function SentenceBuilder({ task, say, onAnswer }: ExerciseProps<SentenceTask>) {
  const [pool, setPool] = useState<Token[]>(() =>
    task.pool.map((text, i) => ({ uid: `${i}:${text}`, text })),
  )
  const [answer, setAnswer] = useState<Token[]>([])
  const [verdict, setVerdict] = useState<null | 'correct' | 'wrong'>(null)

  const target = task.sentence.tokens.join(' ')
  const current = answer.map((t) => t.text).join(' ')

  function move(token: Token, from: 'pool' | 'answer') {
    if (verdict) return
    if (from === 'pool') {
      setPool((p) => p.filter((t) => t.uid !== token.uid))
      setAnswer((a) => [...a, token])
    } else {
      setAnswer((a) => a.filter((t) => t.uid !== token.uid))
      setPool((p) => [...p, token])
    }
  }

  function check() {
    if (verdict || !answer.length) return
    const ok = current === target
    setVerdict(ok ? 'correct' : 'wrong')
    if (ok) say(target)
    onAnswer(ok, target)
  }

  const frameTone =
    verdict === 'correct'
      ? 'border-emerald-400 bg-emerald-50'
      : verdict === 'wrong'
        ? 'border-rose-300 bg-rose-50'
        : 'border-violet-200 bg-white/70'

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-lg font-bold text-ink-soft">{PROMPTS.sentence}</p>

      <div className="flex items-center gap-3">
        {task.showHint ? (
          <span className="text-center text-xl font-extrabold">{task.sentence.pl}</span>
        ) : (
          <span className="text-center text-base font-bold text-ink-soft">Posłuchaj i ułóż to zdanie</span>
        )}
        <SpeakerButton onClick={() => say(target)} />
      </div>

      {/* Rząd odpowiedzi */}
      <div
        data-row="answer"
        className={`flex min-h-24 w-full flex-wrap content-start gap-2 rounded-2xl border-2 border-dashed p-3 ${frameTone}`}
      >
        {answer.map((t) => (
          <motion.button
            key={t.uid}
            layout
            type="button"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={() => move(t, 'answer')}
            disabled={!!verdict}
            className="chunky chunky-press rounded-xl border-2 border-violet-300 bg-violet-100 px-3 py-2 text-lg font-extrabold text-violet-900 [--chunky-shadow:var(--color-violet-300)]"
          >
            {t.text}
          </motion.button>
        ))}
      </div>

      {/* Klocki do wyboru */}
      <div data-row="pool" className="flex min-h-20 w-full flex-wrap justify-center gap-2">
        {pool.map((t) => (
          <motion.button
            key={t.uid}
            layout
            type="button"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={() => move(t, 'pool')}
            disabled={!!verdict}
            className="chunky chunky-press rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-lg font-extrabold [--chunky-shadow:var(--color-slate-300)]"
          >
            {t.text}
          </motion.button>
        ))}
      </div>

      {!verdict && (
        <PrimaryButton tone="emerald" disabled={!answer.length} onClick={check}>
          Sprawdź
        </PrimaryButton>
      )}
    </div>
  )
}
