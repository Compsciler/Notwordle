import { getPartialWordleStatus } from '../../lib/statuses'
import { Cell } from '../grid/Cell'

type Props = {
  guess?: string
  solution: string
  isRevealing?: boolean
  isCompleted?: boolean
  isWaiting?: boolean
}

export const PartialWordleStatusCell = ({ solution, guess, isRevealing, isCompleted, isWaiting }: Props) => {
  const value = (isCompleted && isRevealing) ? ' ' : (isWaiting ? '?' : '')
  
  if (!guess || !(isCompleted && !isRevealing)) {
    return (
      <Cell
        value={value}
        isRevealing={isRevealing}
        isCompleted={isCompleted}
        target="char"
      />
    )
  }
  
  const partialWordleStatus = getPartialWordleStatus(guess, solution)
  const status = partialWordleStatus.status
  const status_val = partialWordleStatus.value
  
  return (
    <Cell
      status={status}
      value={status_val.toString()}
      isRevealing={isRevealing}
      isCompleted={isCompleted}
      target="char"
    />
  )
}
