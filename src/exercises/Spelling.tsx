import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import type { SpellingTask } from '../types'
import type { ExerciseProps } from './common'
import { PROMPTS } from './common'
import { Asset, PrimaryButton, SpeakerButton } from '../ui/kit'

export function Spelling({ task, say, onAnswer }: ExerciseProps<SpellingTask>) {
  const target = task.word.en.toLowerCase().replace(/[^a-z]/g, '')

  useEffect(() => {
    const t = setTimeout(() => say(task.word.en), 250)
    return () => clearTimeout(t)
  }, [task.key, say, task.word.en])

  return task.mode === 'keyboard' ? (
    <KeyboardMode task={task} say={say} onAnswer={onAnswer} target={target} />
  ) : (
    <TileMode task={task} say={say} onAnswer={onAnswer} target={target} />
  )
}

function Prompt({ task, say }: { task: SpellingTask; say: (t: string) => void }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Asset value={task.word.asset} size="lg" />
      <div className="flex items-center gap-3">
        <span className="text-xl font-extrabold">{task.word.pl}</span>
        <SpeakerButton onClick={() => say(task.word.en)} />
      </div>
    </div>
  )
}

// ——— T1/T2: kafelki liter

function TileMode({
  task,
  say,
  onAnswer,
  target,
}: ExerciseProps<SpellingTask> & { target: string }) {
  const [tiles, setTiles] = useState(() => task.letters.map((ch, i) => ({ uid: `${i}:${ch}`, ch })))
  const [slots, setSlots] = useState<{ uid: string; ch: string }[]>([])
  const [verdict, setVerdict] = useState<null | 'correct' | 'wrong'>(null)

  const current = slots.map((s) => s.ch).join('')

  function check(next: typeof slots) {
    if (next.length !== target.length) return
    const ok = next.map((s) => s.ch).join('') === target
    setVerdict(ok ? 'correct' : 'wrong')
    if (ok) say(task.word.en)
    onAnswer(ok, task.word.en)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-lg font-bold text-ink-soft">{PROMPTS.spelling}</p>
      <Prompt task={task} say={say} />

      <div data-row="slots" className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: target.length }, (_, i) => {
          const s = slots[i]
          const tone =
            verdict === 'correct'
              ? 'border-emerald-400 bg-emerald-100 text-emerald-900'
              : verdict === 'wrong'
                ? 'border-rose-300 bg-rose-100 text-rose-900'
                : s
                  ? 'border-violet-300 bg-violet-100 text-violet-900'
                  : 'border-slate-300 border-dashed bg-white/60'
          return (
            <button
              key={i}
              type="button"
              disabled={!s || !!verdict}
              onClick={() => {
                if (!s || verdict) return
                setSlots((prev) => prev.filter((x) => x.uid !== s.uid))
                setTiles((prev) => [...prev, s])
              }}
              className={`h-14 w-11 rounded-xl border-2 text-2xl font-black uppercase ${tone}`}
            >
              {s?.ch ?? ''}
            </button>
          )
        })}
      </div>

      <div data-row="tiles" className="flex min-h-16 flex-wrap justify-center gap-2">
        {tiles.map((t) => (
          <motion.button
            key={t.uid}
            layout
            type="button"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            disabled={!!verdict || slots.length >= target.length}
            onClick={() => {
              if (verdict || slots.length >= target.length) return
              const next = [...slots, t]
              setSlots(next)
              setTiles((prev) => prev.filter((x) => x.uid !== t.uid))
              check(next)
            }}
            className="chunky chunky-press h-14 w-12 rounded-xl border-2 border-slate-200 bg-white text-2xl font-black uppercase [--chunky-shadow:var(--color-slate-300)]"
          >
            {t.ch}
          </motion.button>
        ))}
      </div>

      {!verdict && current.length > 0 && (
        <button
          type="button"
          onClick={() => {
            setTiles((prev) => [...prev, ...slots])
            setSlots([])
          }}
          className="text-sm font-bold text-ink-soft underline"
        >
          Wyczyść
        </button>
      )}
    </div>
  )
}

// ——— T3: klawiatura (tylko dla starszego profilu)

function KeyboardMode({
  task,
  say,
  onAnswer,
  target,
}: ExerciseProps<SpellingTask> & { target: string }) {
  const [value, setValue] = useState('')
  const [verdict, setVerdict] = useState<null | 'correct' | 'wrong'>(null)
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [task.key])

  function check() {
    if (verdict || !value.trim()) return
    const ok = value.trim().toLowerCase().replace(/[^a-z]/g, '') === target
    setVerdict(ok ? 'correct' : 'wrong')
    if (ok) say(task.word.en)
    onAnswer(ok, task.word.en)
  }

  const tone =
    verdict === 'correct'
      ? 'border-emerald-400 bg-emerald-50'
      : verdict === 'wrong'
        ? 'border-rose-300 bg-rose-50'
        : 'border-slate-300 bg-white'

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-lg font-bold text-ink-soft">{PROMPTS.spellingKeyboard}</p>
      <Prompt task={task} say={say} />

      <input
        ref={ref}
        value={value}
        disabled={!!verdict}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && check()}
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        placeholder="napisz po angielsku"
        className={`w-full rounded-2xl border-2 px-4 py-4 text-center text-2xl font-extrabold outline-none ${tone}`}
      />

      {!verdict && (
        <PrimaryButton tone="emerald" disabled={!value.trim()} onClick={check}>
          Sprawdź
        </PrimaryButton>
      )}
    </div>
  )
}
