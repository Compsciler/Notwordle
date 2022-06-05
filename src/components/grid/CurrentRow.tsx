import { Cell } from './Cell'
import { unicodeSplit } from '../../lib/words'
import { ScrabbleScoreCell } from '../rankdisplay/ScrabbleScoreCell'
import { LadderDistanceCell } from '../rankdisplay/LadderDistanceCell'
import { PartialWordleStatusCell } from '../rankdisplay/PartialWordleStatusCell'

type Props = {
  guess: string
  solution: string
  className: string
}

export const CurrentRow = ({ guess, solution, className }: Props) => {
  const splitGuess = unicodeSplit(guess)
  const emptyCells = Array.from(Array(solution.length - splitGuess.length))
  const classes = `flex justify-center mb-1 ${className}`  
  
  return (
    <div className={classes}>
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
      <div className="ml-2" />
      <ScrabbleScoreCell
        solution={solution}
        guess={guess}
      />
      <Cell
        target="rank"
        status={emptyCells.length === 0 ? 'waiting' : undefined}
        rankType="scrabble"
      />
      <Cell
        target="rank"
        status={emptyCells.length === 0 ? 'waiting' : undefined}
        rankType="alpha"
      />
      <Cell
        target="rank"
        status={emptyCells.length === 0 ? 'waiting' : undefined}
        rankType="freq"
      />
      <LadderDistanceCell
        solution={solution}
        guess={guess}
        isCompleted={false}
        isRevealing={false}
        isWaiting={emptyCells.length === 0 ? true : false}
      />
      <PartialWordleStatusCell
        solution={solution}
        guess={guess}
        isCompleted={false}
        isRevealing={false}
        isWaiting={emptyCells.length === 0 ? true : false}
      />
    </div>
  )
}
