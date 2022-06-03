import { BaseRankDisplay } from './BaseRankDisplay'
import { HighLowStatus } from '../../lib/statuses'

type Props = {
  rank: HighLowStatus
}

export const ScrabbleRankDisplay = ({ rank }: Props) => {
  return (
    <BaseRankDisplay
      rank={rank}
      higherText="SCORE TOO HIGH"
      lowerText="SCORE TOO LOW"
      equalText="SCORE EQUAL"
    />
  )
}
