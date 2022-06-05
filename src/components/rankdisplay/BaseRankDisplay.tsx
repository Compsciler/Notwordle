import { HighLowStatus } from '../../lib/statuses'

type Props = {
  rank: HighLowStatus
  higherText: string
  lowerText: string
  equalText: string
}

export const BaseRankDisplay = ({ rank, higherText, lowerText, equalText }: Props) => { 
  const display = (() => {
    switch (rank) {
      case 'high': {
        return higherText
      }
      case 'low': {
        return lowerText
      }
      case 'equal': {
        return equalText
      }
      case 'waiting': {
        return 'WAITING'
      }
      default: {
        return ''
      }
    }
  })()

  if (display === 'WAITING') {    
    return (
      <div>
        ?
      </div>
    )
  }
  return (
    <div
      className="text-black text-center text-xs"
      style={{ lineHeight: '1.1em', fontSize: '0.71rem' }}
    >
      {display}
    </div>
  )
}
