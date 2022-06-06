import { WORDS } from '../constants/wordlist'
import { VALID_GUESSES } from '../constants/validGuesses'
import { NOT_EQUAL_SCRABBLE_MESSAGE, TOO_HIGH_ALPHA_MESSAGE, TOO_HIGH_SCRABBLE_MESSAGE, TOO_LOW_ALPHA_MESSAGE, TOO_LOW_SCRABBLE_MESSAGE } from '../constants/strings'
import { getScrabbleScore } from './statuses'
import { default as GraphemeSplitter } from 'grapheme-splitter'

export const isWordInWordList = (word: string) => {
  return (
    VALID_GUESSES.includes(localeAwareLowerCase(word))
  )
}

export const isWinningWord = (word: string, solution: string) => {
  return word === solution
}

export const isWinningWordOfDay = (word: string) => {
  return isWinningWord(word, solution)
}

export const isGuessOutsideScrabbleRange = (guess: string, guesses: string[], solution: string) => {
  const guessScore = getScrabbleScore(guess)
  const guessesScores = guesses.map(getScrabbleScore)
  const solutionScore = getScrabbleScore(solution)

  let rangeMin = Number.NEGATIVE_INFINITY
  let rangeMax = Number.POSITIVE_INFINITY

  guessesScores.forEach(guess_ => {
    if (guess_ < solutionScore) {
      rangeMin = Math.max(guess_, rangeMin)
    } else if (guess_ > solutionScore) {
      rangeMax = Math.min(guess_, rangeMax)
    } else {
      rangeMin = solutionScore
      rangeMax = solutionScore
    }
  })

  if (rangeMin === solutionScore && rangeMax === solutionScore) {
    if (guessScore !== solutionScore) {
      return NOT_EQUAL_SCRABBLE_MESSAGE(solutionScore)
    }
    return false
  }
  if (guessScore <= rangeMin) {
    return TOO_LOW_SCRABBLE_MESSAGE(rangeMin)
  }
  if (guessScore >= rangeMax) {
    return TOO_HIGH_SCRABBLE_MESSAGE(rangeMax)
  }
  return false
}

export const isGuessOutsideAlphaRange = (guess: string, guesses: string[], solution: string) => {
  let rangeMin = ''
  let rangeMax = '~'

  guesses.forEach(guess_ => {
    if (guess_ < solution) {
      if (guess_ > rangeMin) {
        rangeMin = guess_
      }
    } else if (guess_ > solution) {
      if (guess_ < rangeMax) {
        rangeMax = guess_
      }
    }
  })

  if (guess <= rangeMin) {
    return TOO_LOW_ALPHA_MESSAGE(rangeMin)
  }
  if (guess >= rangeMax) {
    return TOO_HIGH_ALPHA_MESSAGE(rangeMax)
  }
  return false
}

export const unicodeSplit = (word: string) => {
  return new GraphemeSplitter().splitGraphemes(word)
}

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length
}

export const localeAwareLowerCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toLowerCase()
}

export const localeAwareUpperCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toUpperCase()
}

export const getWordBySolutionIndex = (solutionIndex: number) => {
  if (solutionIndex < 0 || solutionIndex >= WORDS.length) {
    return {
      solution: '',
      solutionIndex: -1
    }
  }
  return {
    solution: localeAwareUpperCase(WORDS[solutionIndex]),
    solutionIndex: solutionIndex,
  }
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epoch = new Date(2022, 0)
  const start = new Date(epoch)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  let index = 0
  while (start < today) {
    index++
    start.setDate(start.getDate() + 1)
  }

  const nextDay = new Date(today)
  nextDay.setDate(today.getDate() + 1)

  const offset = -20
  const solutionAndIndex = getWordBySolutionIndex((index + offset) % WORDS.length)

  return {
    solution: solutionAndIndex.solution,
    solutionIndex: solutionAndIndex.solutionIndex,
    tomorrow: nextDay.valueOf(),
  }
}

export const { solution, solutionIndex, tomorrow } = getWordOfDay()
