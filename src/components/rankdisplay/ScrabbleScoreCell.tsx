import { getScrabbleScore } from '../../lib/statuses'
import { Cell } from '../grid/Cell'

type Props = {
  guess?: string
  solution: string
  isRevealing?: boolean
  isCompleted?: boolean
}

export const ScrabbleScoreCell = ({ solution, guess, isRevealing, isCompleted }: Props) => {
  if (!guess) {
    return (
      <Cell
        value=""
        position={solution.length}
        isRevealing={isRevealing}
        isCompleted={isCompleted}
        target="char"
      />
    )
  }
  
  const score = getScrabbleScore(guess)
  
  return (
    <Cell
      value={score.toString()}
      isRevealing={isRevealing}
      isCompleted={isCompleted}
      target="char"
    />
  )
}
