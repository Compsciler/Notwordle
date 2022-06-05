import { LadderDistanceCell } from '../rankdisplay/LadderDistanceCell'
import { PartialWordleStatusCell } from '../rankdisplay/PartialWordleStatusCell'
import { ScrabbleScoreCell } from '../rankdisplay/ScrabbleScoreCell'
import { Cell } from './Cell'

type Props = {
  solution: string
}

export const EmptyRow = ({ solution }: Props) => {
  const emptyCells = Array.from(Array(solution.length))

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
      <div className="ml-2" />
      <ScrabbleScoreCell solution={solution} />
      <Cell target="rank" />
      <Cell target="rank" />
      <Cell target="rank" />
      <LadderDistanceCell solution={solution} />
      <PartialWordleStatusCell solution={solution} />
    </div>
  )
}
