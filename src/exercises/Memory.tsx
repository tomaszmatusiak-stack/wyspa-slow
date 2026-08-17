import { useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'
import type { MemoryTask } from '../types'
import type { ExerciseProps } from './common'
import { PROMPTS } from './common'
import { play } from '../audio/sfx'
import { shuffle } from '../engine/random'
import { Asset } from '../ui/kit'

interface Card {
  uid: string
  wordId: string
  face: 'asset' | 'en' | 'pl'
  label: string
}

export function Memory({ task, say, onAnswer }: ExerciseProps<MemoryTask>) {
  const cards = useMemo<Card[]>(() => {
    const left = task.variant === 'pic-en' ? 'asset' : 'en'
    const right = task.variant === 'pic-en' ? 'en' : 'pl'
    const build = (face: 'asset' | 'en' | 'pl'): Card[] =>
      task.words.map((w) => ({
        uid: `${w.id}:${face}`,
        wordId: w.id,
        face,
        label: face === 'asset' ? w.asset : face === 'en' ? w.en : w.pl,
      }))
    return shuffle([...build(left), ...build(right)])
  }, [task.key, task.variant, task.words])

  const [flipped, setFlipped] = useState<string[]>([])
  const [matched, setMatched] = useState<string[]>([])
  const mistakes = useRef(0)
  const busy = useRef(false)
  const done = useRef(false)

  function flip(card: Card) {
    if (busy.current || done.current) return
    if (matched.includes(card.wordId) || flipped.includes(card.uid)) return

    const next = [...flipped, card.uid]
    setFlipped(next)
    play('flip')
    if (card.face === 'en') say(card.label)

    if (next.length < 2) return

    const [a, b] = next.map((uid) => cards.find((c) => c.uid === uid)!)
    busy.current = true

    if (a.wordId === b.wordId) {
      setTimeout(() => {
        play('match')
        const nextMatched = [...matched, a.wordId]
        setMatched(nextMatched)
        setFlipped([])
        busy.current = false
        if (nextMatched.length === task.words.length && !done.current) {
          done.current = true
          // Jedna pomyłka na parę mieści się w normie — memory to też trening pamięci, nie tylko słówek.
          onAnswer(mistakes.current <= task.words.length, '')
        }
      }, 420)
    } else {
      mistakes.current++
      setTimeout(() => {
        setFlipped([])
        busy.current = false
      }, 850)
    }
  }

  const cols = cards.length <= 6 ? 'grid-cols-3' : 'grid-cols-4'

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-lg font-bold text-ink-soft">{PROMPTS.memory}</p>

      <div className={`grid w-full gap-2.5 ${cols}`}>
        {cards.map((card) => {
          const isMatched = matched.includes(card.wordId)
          const isOpen = isMatched || flipped.includes(card.uid)
          return (
            <button
              key={card.uid}
              type="button"
              onClick={() => flip(card)}
              className="relative aspect-square"
              style={{ perspective: 700 }}
              aria-label={isOpen ? card.label : 'Zakryta karta'}
            >
              <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isOpen ? 180 : 0, opacity: isMatched ? 0.45 : 1 }}
                transition={{ duration: 0.32 }}
              >
                <span
                  className="chunky absolute inset-0 grid place-items-center rounded-2xl bg-violet-500 text-3xl text-white [--chunky-shadow:var(--color-violet-700)]"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  ❓
                </span>
                <span
                  className="chunky absolute inset-0 grid place-items-center overflow-hidden rounded-2xl border-2 border-slate-200 bg-white px-1 text-center [--chunky-shadow:var(--color-slate-300)]"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  {card.face === 'asset' ? (
                    <Asset value={card.label} size="md" />
                  ) : (
                    <span className="text-sm leading-tight font-extrabold break-words">{card.label}</span>
                  )}
                </span>
              </motion.div>
            </button>
          )
        })}
      </div>

      <p className="text-sm font-bold text-ink-soft">
        Pary: {matched.length} / {task.words.length}
      </p>
    </div>
  )
}
