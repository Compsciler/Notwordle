import { Dialog, Transition } from '@headlessui/react'
import classnames from 'classnames'
import { Dispatch, SetStateAction } from 'react'
import { VALID_GUESSES_UPPER } from '../../constants/validGuesses'
import { findFirstLadder } from '../../lib/wordladder'

type Props = {
  solution: string,
  guesses: string[],
  guessLadders: string[][],
  isGameComplete: boolean,
  isSolutionButtonClicked: boolean,
  setIsSolutionButtonClicked: Dispatch<SetStateAction<boolean>>,
  setGuessLadders: Dispatch<SetStateAction<string[][]>>
}

const styles = {
  fontSize: '18px',
  flexFlow: 'wrap',
}
const hrStyles = {
  flexBasis: '100%',
  border: 0,
  height: 0,
  margin: 0,
}
const buttonStyles = {
  fontSize: '16px',
  width: '200px',
  height: '37px',
}

const classes = "flex justify-center mt-4 ml-2 mr-2 text-center dark:text-white"

const buttonClasses = classnames(
  'flex items-center justify-center rounded mt-4 mx-0.5 text-xs font-bold cursor-pointer select-none dark:text-white',
  {
    'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 active:bg-slate-400': true
  }
)

export const SolutionText = ({ solution, guesses, guessLadders, isGameComplete, isSolutionButtonClicked, setIsSolutionButtonClicked, setGuessLadders }: Props) => {
  if (isSolutionButtonClicked) {
    if (guessLadders.length === 0) {
      const guessLadders_ = guesses.map((guess) => (
        findFirstLadder(guess, solution, VALID_GUESSES_UPPER)
      ))
      guessLadders = guessLadders_
      setGuessLadders(guessLadders)
    }
    return (
      <Transition.Root show={isGameComplete} style={styles} className={classes}>
        {
          guessLadders.map((guessLadder, i) => (
            <>
              <p key={i}>{formatLadder(guessLadder)}</p>
              <hr style={hrStyles} />
            </>
          ))
        }
      </Transition.Root>
    )
  } else {
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      setIsSolutionButtonClicked(true)
      event.currentTarget.blur()
    }

    return (
      <Transition.Root show={isGameComplete} style={styles} className={classes}>
        <button
          style={buttonStyles}
          aria-label="Show word ladders"
          className={buttonClasses}
          onClick={handleClick}
        >
          Show word ladders
        </button>
      </Transition.Root>
    )
  }
}

const formatLadder = (words: string[]): string => {
  if (words.length === 0) {
    return '-'
  }
  words = words.map(word => word.toUpperCase())
  return words.join(' → ')
}
