import { scrabbleScore } from '../../constants/scrabbleScore'
import { unicodeSplit } from '../../lib/words'
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
  
  const splitGuess = unicodeSplit(guess)
  const score = splitGuess.reduce(
    (prevScore, c) => prevScore + scrabbleScore[c.toLowerCase()],
    0
  )
  
  return (
    <Cell
      value={score.toString()}
      isRevealing={isRevealing}
      isCompleted={isCompleted}
      target="char"
    />
  )
}
