import { Cell } from '../grid/Cell'
import { CompletedRow } from '../grid/CompletedRow'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  const a_classes = "underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose} isWide={true}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Guess the word in 10 tries. After each guess, the color of the tiles will
        change to show how close your guess was to the word.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Unfortunately, the typical Wordle letter tiles are broken, 
        and you will need to rely on other clues on how your guess relates to the solution.
      </p>
      <br />
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Meaning of clues to the right of each word, from left to right:
        {/* <br /><br /> */}
        <ol>
          <li>
            <b>1.</b> <a href="https://www.thewordfinder.com/scrabble-point-values.php" target="_blank" className={a_classes}>Scrabble score</a> {' '}
            of your guess
          </li>
          <li>
            <b>2.</b> Guess Scrabble score compared to solution Scrabble score
          </li>
          <li>
            <b>3.</b> Alphabetical comparison of guess to solution (which comes first in dictionary)
          </li>
          <li>
            <b>4.</b> Word frequency comparison of guess to solution (based on Google Books n-grams dataset)
          </li>
          <li>
            <b>5.</b> Shortest word ladder length from guess to solution, altering one letter at a time 
            (displays "-" if word ladder doesn't exist) {<br />}
            For example, the length between SHINY and STING is 4 (number of letter changes): SHINY → SHINE → SWINE → SWING → STING.
          </li>
          <li>
            <b>6.</b> Clue based original Wordle letter colors: 
            displays green if there is at least one green in the guess, else yellow if there is at least one yellow in the guess, 
            and gray otherwise. The number on the tile is how many letters of that color are present in the guess.
          </li>
          <br />
        </ol>
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-300">
        Sample guesses if the word is THIRD:
      </p>
      <br />
      <CompletedRow
        solution="THIRD"
        guess="WHERE"
        isRevealing={false}
      />
      <CompletedRow
        solution="THIRD"
        guess="PILLS"
        isRevealing={false}
      />
      <CompletedRow
        solution="THIRD"
        guess="VAGUE"
        isRevealing={false}
      />
      <br />
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The guess WHERE tells you that the solution has a score lower than 11, 
        alphabetically comes before WHERE, is less common than WHERE, 
        can be transformed into WHERE in 5 steps, and has 2 green letter tiles 
        (and an unknown number of yellow and gray tiles).
      </p>

      <p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        This is an open source version of the word guessing game we all know and
        love -{' '}
        <a
          href="https://github.com/Compsciler/Notwordle/"
          className="underline font-bold"
        >
          check out the code here
        </a>{' '}
      </p>
    </BaseModal>
  )
}
