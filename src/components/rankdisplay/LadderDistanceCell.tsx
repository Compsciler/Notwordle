import { getWordLadderDistance } from '../../lib/statuses'
import { Cell } from '../grid/Cell'

type Props = {
  guess?: string
  solution: string
  isRevealing?: boolean
  isCompleted?: boolean
  isWaiting?: boolean
}

export const LadderDistanceCell = ({ solution, guess, isRevealing, isCompleted, isWaiting }: Props) => {
  const value = (isCompleted && isRevealing) ? ' ' : (isWaiting ? '?' : '')
  
  if (!guess || !(isCompleted && !isRevealing)) {
    return (
      <Cell
        value={value}
        position={solution.length}
        isRevealing={isRevealing}
        isCompleted={isCompleted}
        target="char"
      />
    )
  }
  
  const distance = getWordLadderDistance(guess, solution)
  const distanceStr = distance === -1 ? '-' : distance.toString()
  
  return (
    <Cell
      value={distanceStr}
      isRevealing={isRevealing}
      isCompleted={isCompleted}
      target="char"
    />
  )
}
