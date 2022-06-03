import { CharStatus, HighLowStatus } from '../../lib/statuses'
import classnames from 'classnames'
import { REVEAL_TIME_MS } from '../../constants/settings'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'
import { BaseRankDisplay } from '../rankdisplay/BaseRankDisplay'
import { ScrabbleRankDisplay } from '../rankdisplay/ScrabbleRankDisplay'
import { AlphaRankDisplay } from '../rankdisplay/AlphaRankDisplay'

type Props = {
  value?: string
  status?: CharStatus | HighLowStatus
  isRevealing?: boolean
  isCompleted?: boolean
  position?: number
  target?: 'char' | 'rank'
  rankType?: 'scrabble' | 'alpha'
}

/*
scrabble score
scrabble higher or lower
alpha higher lower
frequency higher lower
word ladder distance
*/

export const Cell = ({
  value,
  status,
  isRevealing,
  isCompleted,
  position = 0,
  target = 'char',
  rankType,
}: Props) => {
  const isFilled = value && !isCompleted
  const shouldReveal = isRevealing && isCompleted
  const animationDelay = `${position * REVEAL_TIME_MS}ms`
  const isHighContrast = getStoredIsHighContrastMode()

  const classes = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white',
    {
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        !status,
      'border-black dark:border-slate-100': value && !status,
      'absent shadowed bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
        status === 'absent',
      'correct shadowed bg-orange-500 text-white border-orange-500':
        status === 'correct' && isHighContrast,
      'present shadowed bg-cyan-500 text-white border-cyan-500':
        status === 'present' && isHighContrast,
      'correct shadowed bg-green-500 text-white border-green-500':
        status === 'correct' && !isHighContrast,
      'present shadowed bg-yellow-500 text-white border-yellow-500':
        status === 'present' && !isHighContrast,
      'high bg-red-400 text-white border-red-500 dark:bg-red-400 dark:border-red-500':
        target === 'rank' && status === 'high',
      'low bg-blue-400 text-white border-blue-500 dark:bg-blue-400 dark:border-blue-500':
        target === 'rank' && status === 'low',
      'equal bg-lime-400 text-white text-white border-lime-500 dark:bg-lime-400 dark:border-lime-500':
        target === 'rank' && status === 'equal',
      'waiting border-black dark:bg-slate-900 dark:border-neutral-300':
        target === 'rank' && status === 'waiting',
      'cell-fill-animation': isFilled,
      'cell-reveal': shouldReveal,
    }
  )

  const RankDisplay = (rankType === 'scrabble') ? ScrabbleRankDisplay : AlphaRankDisplay
  return (
    <div className={classes} style={{ animationDelay }}>
      <div className="letter-container" style={{ animationDelay }}>
        {target === 'char' ? (
          value
        ) : (
          <RankDisplay
            rank={isRevealing ? 'waiting' : (status as HighLowStatus)}
          />
        )}
      </div>
    </div>
  )
}
