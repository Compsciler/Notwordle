import { getAlphabeticalStatus, getFrequencyStatus, getGuessStatuses, getScrabbleStatus } from '../../lib/statuses'
import { Cell } from './Cell'
import { unicodeSplit } from '../../lib/words'
import { ScrabbleScoreCell } from '../rankdisplay/ScrabbleScoreCell'
import { LadderDistanceCell } from '../rankdisplay/LadderDistanceCell'
import { PartialWordleStatusCell } from '../rankdisplay/PartialWordleStatusCell'

type Props = {
  solution: string
  guess: string
  isRevealing?: boolean
}

export const CompletedRow = ({ solution, guess, isRevealing }: Props) => {
  const statuses = getGuessStatuses(solution, guess)
  const splitGuess = unicodeSplit(guess)

  const scrabbleStatus = getScrabbleStatus(guess, solution)
  const alphaStatus = getAlphabeticalStatus(guess, solution)
  const freqStatus = getFrequencyStatus(guess, solution)

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
        />
      ))}
      <div className="ml-2" />
      <ScrabbleScoreCell
        solution={solution}
        guess={guess}
        isRevealing={isRevealing}
        isCompleted
      />
      <Cell
        status={scrabbleStatus}
        position={solution.length + 1}
        isRevealing={isRevealing}
        isCompleted
        target="rank"
        rankType="scrabble"
      />
      <Cell
        status={alphaStatus}
        position={solution.length + 2}
        isRevealing={isRevealing}
        isCompleted
        target="rank"
        rankType="alpha"
      />
      <Cell
        status={freqStatus}
        position={solution.length + 3}
        isRevealing={isRevealing}
        isCompleted
        target="rank"
        rankType="freq"
      />
      <LadderDistanceCell
        solution={solution}
        guess={guess}
        isRevealing={isRevealing}
        isCompleted
        isWaiting
      />
      <PartialWordleStatusCell
        solution={solution}
        guess={guess}
        isRevealing={isRevealing}
        isCompleted
        isWaiting
      />
    </div>
  )
}
