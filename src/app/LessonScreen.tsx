import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'
import type { Task } from '../types'
import { ROUNDS, ROUND_COUNT } from '../types'
import { LESSON_BY_ID } from '../content/worlds'
import { TEST_SIZE, buildRound, buildTest } from '../engine/lessonBuilder'
import { SessionMood } from '../engine/difficulty'
import { RETRY_SUFFIX, retryTask } from '../engine/retry'
import { progressMapFor, roundsDone, useGame } from '../store/useGame'
import { play } from '../audio/sfx'
import { stopSpeaking } from '../audio/tts'
import { Bar, PrimaryButton } from '../ui/kit'
import type { Grade } from '../engine/scoring'
import { Exercise } from '../exercises'
import { RoundBreak } from './RoundBreak'
import { useSay } from './useSay'
import { Emoji } from '../ui/Emoji'

/** Runda ma trwać ~11 minut; po piętnastu ucinamy ją i proponujemy przerwę. */
const ROUND_TIME_LIMIT_MS = 15 * 60 * 1000

/** Sufit długości rundy razem z powtórkami błędów. */
const MAX_QUEUE = 22

export interface LessonResult {
  lessonId: string
  xp: number
  crystals: number
  stars: 1 | 2 | 3
  grade: Grade
  gradeLabel: string
  levelUp: boolean
  errors: number
  tasks: number
  testCorrect: number
  testTotal: number
}

/** Faza „sprawdzian" siedzi na indeksie zaraz za ostatnią rundą. */
const TEST_PHASE = ROUND_COUNT

export function LessonScreen({
  lessonId,
  onDone,
  onExit,
}: {
  lessonId: string
  onDone: (result: LessonResult) => void
  onExit: () => void
}) {
  const lesson = LESSON_BY_ID.get(lessonId)!
  const say = useSay()
  const recordAnswer = useGame((s) => s.recordAnswer)
  const finishRound = useGame((s) => s.finishRound)
  const finishLesson = useGame((s) => s.finishLesson)

  const maxTier = useGame(
    (s) => s.profiles.find((p) => p.id === s.activeProfileId)?.settings.maxTier ?? 2,
  )

  // Wznawiamy od rundy, na której dziecko skończyło poprzednio.
  const [round, setRound] = useState(() => {
    const s = useGame.getState()
    // roundsDone === ROUND_COUNT znaczy: rundy zrobione, został sprawdzian.
    return Math.min(TEST_PHASE, roundsDone(s.rounds, s.activeProfileId!, lessonId))
  })

  const [queue, setQueue] = useState<Task[]>(() => makeRound(round))
  const [index, setIndex] = useState(0)
  const [feedback, setFeedback] = useState<{
    correct: boolean
    solution: string
    praise: string
  } | null>(null)
  const [breakInfo, setBreakInfo] = useState<{ xp: number; crystals: number; ranOut: boolean } | null>(
    null,
  )

  const mood = useMemo(() => new SessionMood(), [])
  const roundStartedAt = useRef(Date.now())
  const roundTasks = useRef(0)
  const roundErrors = useRef(0)
  const totalTasks = useRef(0)
  const totalErrors = useRef(0)
  const retried = useRef(new Set<string>())
  const closingRound = useRef(false)
  const endRoundRef = useRef<(ranOut: boolean) => void>(() => {})

  function makeRound(r: number): Task[] {
    const s = useGame.getState()
    const ctx = {
      lesson,
      progress: progressMapFor(s, s.activeProfileId!),
      maxTier,
      now: Date.now(),
    }
    return r >= TEST_PHASE ? buildTest(ctx) : buildRound(r, ctx)
  }

  const isTest = round >= TEST_PHASE
  const task = queue[index]

  function endRound(ranOut: boolean) {
    if (closingRound.current) return
    closingRound.current = true

    const seconds = Math.round((Date.now() - roundStartedAt.current) / 1000)

    if (isTest) {
      // Sprawdzian domyka dzień: jego wynik decyduje o ocenie i gwiazdkach.
      const testTotal = roundTasks.current
      const testCorrect = testTotal - roundErrors.current
      const final = finishLesson({
        lessonId,
        tasks: totalTasks.current + testTotal,
        errors: totalErrors.current + roundErrors.current,
        testCorrect,
        testTotal,
      })
      play(final.levelUp ? 'levelUp' : 'finish')
      onDone({
        lessonId,
        ...final,
        errors: totalErrors.current + roundErrors.current,
        tasks: totalTasks.current + testTotal,
        testCorrect,
        testTotal,
      })
      return
    }

    const reward = finishRound({
      lessonId,
      round,
      tasksDone: roundTasks.current,
      errors: roundErrors.current,
      seconds,
    })
    totalTasks.current += roundTasks.current
    totalErrors.current += roundErrors.current

    play(reward.levelUp ? 'levelUp' : 'star')
    setFeedback(null)
    setBreakInfo({ xp: reward.xp, crystals: reward.crystals, ranOut })
  }
  endRoundRef.current = endRound

  function startNextRound() {
    const next = round + 1
    setBreakInfo(null)
    setRound(next)
    setQueue(makeRound(next))
    setIndex(0)
    roundStartedAt.current = Date.now()
    roundTasks.current = 0
    roundErrors.current = 0
    retried.current = new Set()
    closingRound.current = false
  }

  useEffect(() => {
    const t = setInterval(() => {
      if (Date.now() - roundStartedAt.current > ROUND_TIME_LIMIT_MS) endRoundRef.current(true)
    }, 10_000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => () => stopSpeaking(), [])

  function handleAnswer(correct: boolean, solution: string) {
    if (feedback || breakInfo) return
    roundTasks.current++
    recordAnswer(task.itemIds, correct, task.tier)
    mood.register(correct)
    play(correct ? 'correct' : 'wrong')

    if (!correct) {
      roundErrors.current++
      // Błędne zadanie wraca na koniec rundy — dziecko poprawia od razu,
      // a nie dopiero za trzy dni w powtórkach. Powtórka nie dokleja kolejnej powtórki.
      const isRetry = task.key.endsWith(RETRY_SUFFIX)
      if (
        !isTest &&
        !isRetry &&
        !retried.current.has(task.key) &&
        task.kind !== 'memory' &&
        queue.length < MAX_QUEUE
      ) {
        retried.current.add(task.key)
        setQueue((q) => [...q, retryTask(task, mood.easing)])
      }
    }

    setFeedback({ correct, solution, praise: losujPochwale() })
    if (correct) setTimeout(next, 850)
  }

  function next() {
    setFeedback(null)
    if (index + 1 >= queue.length) {
      endRound(false)
      return
    }
    setIndex(index + 1)
  }

  if (breakInfo) {
    return (
      <RoundBreak
        lesson={lesson}
        finishedRound={round}
        xp={breakInfo.xp}
        crystals={breakInfo.crystals}
        ranOutOfTime={breakInfo.ranOut}
        nextIsTest={round + 1 >= TEST_PHASE}
        testSize={TEST_SIZE}
        onContinue={startNextRound}
        onStop={onExit}
      />
    )
  }

  if (!task) return null

  const meta = ROUNDS[Math.min(round, ROUND_COUNT - 1)]

  return (
    <div className="mx-auto flex min-h-full max-w-md flex-col">
      <header className="sticky top-0 z-20 bg-indigo-50/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              stopSpeaking()
              onExit()
            }}
            className="text-2xl font-black text-ink-soft"
            aria-label="Wyjdź z lekcji"
          >
            ✕
          </button>
          <div className="flex-1">
            <Bar value={index} max={queue.length} />
          </div>
          <span className="w-12 text-right text-sm font-black text-ink-soft">
            {index + 1}/{queue.length}
          </span>
        </div>
        <p className="mt-1.5 flex items-center justify-center gap-1.5 text-center text-xs font-black tracking-wide uppercase">
          {isTest ? (
            <span className="flex items-center gap-1.5 text-rose-600">
              <Emoji value="📋" size="xs" /> Sprawdzian · bez podpowiedzi
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-ink-soft">
              <Emoji value={meta.icon} size="xs" /> Runda {round + 1} z {ROUND_COUNT} · {meta.title}
            </span>
          )}
        </p>
      </header>

      {mood.easing && !isTest && (
        <p className="px-4 pt-1 text-center text-xs font-extrabold text-amber-700">
          Robimy trochę łatwiej 💛
        </p>
      )}

      {/* Bez AnimatePresence: animacja wyjścia nie może stać na drodze kolejnemu zadaniu. */}
      <main className="flex-1 px-4 pt-4 pb-40">
        <motion.div
          key={task.key}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.18 }}
        >
          <Exercise task={task} say={say} onAnswer={handleAnswer} />
        </motion.div>
      </main>

      {feedback && (
        <motion.footer
          initial={{ y: 120 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className={`fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md rounded-t-3xl px-5 pt-4 pb-6 ${
            feedback.correct ? 'bg-emerald-400' : 'bg-amber-300'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xl font-black">
                {feedback.correct ? feedback.praise : 'Prawie! Zapamiętaj:'}
              </p>
              {!feedback.correct && feedback.solution && (
                <p className="truncate text-lg font-extrabold">{feedback.solution}</p>
              )}
            </div>
            {!feedback.correct && (
              <PrimaryButton tone="slate" onClick={next}>
                Dalej
              </PrimaryButton>
            )}
          </div>
        </motion.footer>
      )}
    </div>
  )
}

/** Plan mówi: chwal za próby. Zmienna pochwała trzyma uwagę lepiej niż jedno "Dobrze!". */
const POCHWALY = ['Super!', 'Świetnie!', 'Brawo!', 'Ekstra!', 'Tak jest!', 'Idealnie!']
function losujPochwale() {
  return POCHWALY[Math.floor(Math.random() * POCHWALY.length)]
}
