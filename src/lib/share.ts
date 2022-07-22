import { CharStatus, getAlphabeticalStatus, getFrequencyStatus, getGuessStatuses, getPartialWordleStatus, getScrabbleStatus, getWordLadderDistance, HighLowStatus } from './statuses'
import { unicodeSplit } from './words'
import { GAME_TITLE } from '../constants/strings'
import { MAX_CHALLENGES } from '../constants/settings'
import { UAParser } from 'ua-parser-js'

const webShareApiDeviceTypes: string[] = ['mobile', 'smarttv', 'wearable']
const parser = new UAParser()
const browser = parser.getBrowser()
const device = parser.getDevice()
const gameUrl = 'notwordle0.herokuapp.com'

export const shareStatus = (
  solution: string,
  solutionIndex: number,
  guesses: string[],
  lost: boolean,
  isHardMode: boolean,
  isDarkMode: boolean,
  isHighContrastMode: boolean,
  handleShareToClipboard: () => void
) => {
  const textToShare = getTextToShare(solution, solutionIndex, guesses, lost,
    isHardMode, isDarkMode, isHighContrastMode)
  
  const shareData = { text: textToShare }

  let shareSuccess = false

  try {
    if (attemptShare(shareData)) {
      navigator.share(shareData)
      shareSuccess = true
    }
  } catch (error) {
    shareSuccess = false
  }

  if (!shareSuccess) {
    navigator.clipboard.writeText(textToShare)
    handleShareToClipboard()
  }
}

export const getTextToShare = (
  solution: string,
  solutionIndex: number,
  guesses: string[],
  lost: boolean,
  isHardMode: boolean,
  isDarkMode: boolean,
  isHighContrastMode: boolean,
) => {
  return (
    `${GAME_TITLE} ${solutionIndex} ${
      lost ? 'X' : guesses.length
    }/${MAX_CHALLENGES}${isHardMode ? '*' : ''}\n\n` +
    generateEmojiGrid(
      solution,
      guesses,
      getEmojiTiles(false, isHighContrastMode)
    ) + '\n\n' +
    gameUrl
  )
}

export const generateEmojiGrid = (
  solution: string,
  guesses: string[],
  tiles: string[]
) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(solution, guess)
      const splitGuess = unicodeSplit(guess)

      const charTiles = splitGuess
        .map((_, i) => {
          return getStatusEmoji(status[i], tiles)
        })
        .join('')
      
      const scrabbleTile = toHighLowEmoji(getScrabbleStatus(guess, solution))
      const alphaTile = toHighLowEmoji(getAlphabeticalStatus(guess, solution))
      const freqTile = toHighLowEmoji(getFrequencyStatus(guess, solution))
      const ladderTile = getLadderDistanceTile(guess, solution)
      const partialWordleTile = getStatusEmoji(getPartialWordleStatus(guess, solution).status, tiles)
    
      return charTiles + ' ' + scrabbleTile + alphaTile + freqTile + ladderTile + partialWordleTile
    })
    .join('\n')
}

const getStatusEmoji = (status: (CharStatus | undefined), tiles: string[]) => {
  switch (status) {
    case 'correct':
      return tiles[0]
    case 'present':
      return tiles[1]
    default:
      return tiles[2]
  }
}

const attemptShare = (shareData: object) => {
  return (
    // Deliberately exclude Firefox Mobile, because its Web Share API isn't working correctly
    browser.name?.toUpperCase().indexOf('FIREFOX') === -1 &&
    webShareApiDeviceTypes.indexOf(device.type ?? '') !== -1 &&
    navigator.canShare &&
    navigator.canShare(shareData) &&
    navigator.share
  )
}

export const getEmojiTiles = (isDarkMode: boolean, isHighContrastMode: boolean) => {
  let tiles: string[] = []
  tiles.push(isHighContrastMode ? '🟧' : '🟩')
  tiles.push(isHighContrastMode ? '🟦' : '🟨')
  tiles.push(isDarkMode ? '⬛' : '⬜')
  return tiles
}

const toHighLowEmoji = (highLow: HighLowStatus) => {
  switch (highLow) {
    case 'high':
      return '⬇️'
    case 'low':
      return '⬆️'
    case 'equal':
      return '🎯'
  }
}

const getLadderDistanceTile = (guess: string, solution: string) => {
  const tiles: {[distance: number]: string} = {0: '0️⃣', 1: '1️⃣', 2: '2️⃣', 3: '3️⃣', 4: '4️⃣', 
                 5: '5️⃣', 6: '6️⃣', 7: '7️⃣', 8: '8️⃣', 9: '9️⃣',
  }
  const defaultTile = '9️⃣'
  const distance = getWordLadderDistance(guess, solution)
  return tiles[distance] ? tiles[distance] : defaultTile
}
