import { BaseRankDisplay } from './BaseRankDisplay'
import { HighLowStatus } from '../../lib/statuses'

type Props = {
  rank: HighLowStatus
}

export const FreqRankDisplay = ({ rank }: Props) => {
  return (
    <BaseRankDisplay
      rank={rank}
      higherText="TOO COMMON"
      lowerText="TOO OBSCURE"
      equalText="EQUAL"
    />
  )
}
