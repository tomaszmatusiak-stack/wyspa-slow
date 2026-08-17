import type { Task } from '../types'
import { letterTiles } from './distractors'
import { shuffleDifferent } from './random'

/**
 * Klon zadania na powtórkę w tej samej lekcji (lapse queue).
 * Gdy `ease` jest włączone (3 błędy pod rząd), wracamy najłatwiejszym wariantem:
 * mniej opcji, podpowiedź po polsku, klocki zamiast klawiatury.
 */
export const RETRY_SUFFIX = '~r'

export function retryTask(task: Task, ease: boolean): Task {
  const key = `${task.key}${RETRY_SUFFIX}`

  switch (task.kind) {
    case 'listenPick':
      return {
        ...task,
        key,
        options: ease ? trimOptions(task.options, task.word.id, 3) : task.options,
      }

    case 'pictureQuiz':
      return ease
        ? {
            ...task,
            key,
            tier: 1,
            mode: task.word.kind === 'phrase' ? 'pl2word' : 'pic2word',
            options: trimOptions(task.options, task.word.id, 3),
          }
        : { ...task, key }

    case 'sentence':
      return ease
        ? { ...task, key, tier: 1, showHint: true, pool: shuffleDifferent(task.sentence.tokens) }
        : { ...task, key, showHint: true }

    case 'spelling':
      return ease
        ? { ...task, key, tier: 1, mode: 'tiles', letters: letterTiles(task.word.en, 1) }
        : { ...task, key }

    case 'fillGap':
    case 'oddOne':
    case 'math':
    case 'memory':
    case 'match':
    case 'sorting':
    case 'bubbles':
    case 'dialog':
    case 'verbForm':
    case 'verbTable':
    case 'tenseSort':
      return { ...task, key }
  }
}

function trimOptions<T extends { id: string }>(options: T[], correctId: string, count: number): T[] {
  const correct = options.find((o) => o.id === correctId)
  if (!correct) return options.slice(0, count)
  const others = options.filter((o) => o.id !== correctId).slice(0, count - 1)
  return shuffleDifferent([correct, ...others])
}
