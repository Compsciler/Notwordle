import { BaseRankDisplay } from './BaseRankDisplay'
import { HighLowStatus } from '../../lib/statuses'

type Props = {
  rank: HighLowStatus
}

export const AlphaRankDisplay = ({ rank }: Props) => {
  return (
    <BaseRankDisplay
      rank={rank}
      higherText="GO TOWARD A"
      lowerText="GO TOWARD Z"
      equalText="EQUAL"
    />
  )
}
