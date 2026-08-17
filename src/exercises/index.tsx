import type { Task } from '../types'
import type { ExerciseProps } from './common'
import { ListenPick } from './ListenPick'
import { PictureQuiz } from './PictureQuiz'
import { Memory } from './Memory'
import { MatchColumns } from './MatchColumns'
import { SentenceBuilder } from './SentenceBuilder'
import { FillGap } from './FillGap'
import { Spelling } from './Spelling'
import { OddOneOut } from './OddOneOut'
import { Sorting } from './Sorting'
import { Bubbles } from './Bubbles'
import { MathQuiz } from './MathQuiz'
import { DialogGap } from './DialogGap'

export function Exercise({ task, say, onAnswer }: ExerciseProps<Task>) {
  switch (task.kind) {
    case 'listenPick':
      return <ListenPick task={task} say={say} onAnswer={onAnswer} />
    case 'pictureQuiz':
      return <PictureQuiz task={task} say={say} onAnswer={onAnswer} />
    case 'memory':
      return <Memory task={task} say={say} onAnswer={onAnswer} />
    case 'match':
      return <MatchColumns task={task} say={say} onAnswer={onAnswer} />
    case 'sentence':
      return <SentenceBuilder task={task} say={say} onAnswer={onAnswer} />
    case 'fillGap':
      return <FillGap task={task} say={say} onAnswer={onAnswer} />
    case 'spelling':
      return <Spelling task={task} say={say} onAnswer={onAnswer} />
    case 'oddOne':
      return <OddOneOut task={task} say={say} onAnswer={onAnswer} />
    case 'sorting':
      return <Sorting task={task} say={say} onAnswer={onAnswer} />
    case 'bubbles':
      return <Bubbles task={task} say={say} onAnswer={onAnswer} />
    case 'math':
      return <MathQuiz task={task} say={say} onAnswer={onAnswer} />
    case 'dialog':
      return <DialogGap task={task} say={say} onAnswer={onAnswer} />
  }
}
