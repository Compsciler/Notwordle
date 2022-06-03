import { scrabbleScore } from '../constants/scrabbleScore'
import { unicodeSplit } from './words'

export type CharStatus = 'absent' | 'present' | 'correct'
export type HighLowStatus = 'high' | 'low' | 'equal' | 'waiting'

export const getStatuses = (
  solution: string,
  guesses: string[]
): { [key: string]: CharStatus } => {
  return {}
}

export const getGuessStatuses = (
  solution: string,
  guess: string
): (CharStatus | undefined)[] => {
  const splitGuess = unicodeSplit(guess)
  return splitGuess.map((char) => undefined)
}

export const getScrabbleStatus = (guess: string, solution: string) => {
  const splitGuess = unicodeSplit(guess)
  const splitSolution = unicodeSplit(solution)
  const guessScore = splitGuess.reduce(
    (prevScore, c) => prevScore + scrabbleScore[c.toLowerCase()],
    0
  )
  const solutionScore = splitSolution.reduce(
    (prevScore, c) => prevScore + scrabbleScore[c.toLowerCase()],
    0
  )

  if (guessScore < solutionScore) {
    return 'low'
  } else if (guessScore > solutionScore) {
    return 'high'
  }
  return 'equal'
}

export const getAlphabeticalStatus = (guess: string, solution: string) => {
  if (guess < solution) {
    return 'low'
  } else if (guess > solution) {
    return 'high'
  }
  return 'equal'
}
