export const GAME_TITLE = process.env.REACT_APP_GAME_NAME!

export const WIN_MESSAGES = ['Great Job!', 'Awesome', 'Well done!']
export const GAME_COPIED_MESSAGE = 'Game copied to clipboard'
export const NOT_ENOUGH_LETTERS_MESSAGE = 'Not enough letters'
export const WORD_NOT_FOUND_MESSAGE = 'Word not found'
export const HARD_MODE_ALERT_MESSAGE =
  'Hard Mode can only be enabled at the start!'
export const HARD_MODE_DESCRIPTION =
  'Any revealed hints must be used in subsequent guesses'
export const HIGH_CONTRAST_MODE_DESCRIPTION = 'For improved color vision'
export const SPEEDRUN_MODE_DESCRIPTION = 'Reveal guess results immediately (no animations), display stopwatch'
export const MANUAL_SHARE_TEXT_DESCRIPTION = 'Display emoji share grid on Statistics window (turn on if Share button not working)'
export const CORRECT_WORD_MESSAGE = (solution: string) =>
  `The word was ${solution}`
export const WRONG_SPOT_MESSAGE = (guess: string, position: number) =>
  `Must use ${guess} in position ${position}`
export const NOT_CONTAINED_MESSAGE = (letter: string) =>
  `Guess must contain ${letter}`
export const NOT_EQUAL_SCRABBLE_MESSAGE = (solutionScore: number) =>
  `Guess must have a Scrabble score of ${solutionScore}`
export const TOO_LOW_SCRABBLE_MESSAGE = (rangeMin: number) =>
  `Guess must have a higher Scrabble score than ${rangeMin}`
export const TOO_HIGH_SCRABBLE_MESSAGE = (rangeMax: number) =>
  `Guess must have a lower Scrabble score than ${rangeMax}`
export const TOO_LOW_ALPHA_MESSAGE = (rangeMin: string) =>
  `Guess must alphabetically come after ${rangeMin}`
export const TOO_HIGH_ALPHA_MESSAGE = (rangeMax: string) =>
  `Guess must alphabetically come before ${rangeMax}`
export const ENTER_TEXT = 'Enter'
export const DELETE_TEXT = 'Delete'
export const STATISTICS_TITLE = 'Statistics'
export const GUESS_DISTRIBUTION_TEXT = 'Guess Distribution'
export const NEW_WORD_TEXT = 'New word in'
export const SHARE_TEXT = 'Share'
export const MIGRATE_BUTTON_TEXT = 'Transfer'
export const MIGRATE_DESCRIPTION_TEXT =
  'Click here to transfer your statistics to a new device.'
export const TOTAL_TRIES_TEXT = 'Total tries'
export const SUCCESS_RATE_TEXT = 'Success rate'
export const CURRENT_STREAK_TEXT = 'Current streak'
export const BEST_STREAK_TEXT = 'Best streak'
export const DISCOURAGE_INAPP_BROWSER_TEXT =
  "You are using an embedded browser and may experience problems sharing or saving your results. We encourage you rather to use your device's default browser."
