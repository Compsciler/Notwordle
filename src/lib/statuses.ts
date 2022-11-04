import { SCRABBLE_SCORE } from '../constants/scrabbleScore'
import { VALID_GUESSES_UPPER } from '../constants/validGuesses'
import { WORD_FREQ } from '../constants/wordfreq'
import { unicodeSplit } from './words'
import { ladderLength } from './wordladder'

export type CharStatus = 'absent' | 'present' | 'correct'
export type HighLowStatus = 'high' | 'low' | 'equal' | 'waiting'

export type GuessStatuses = {
  scrabbleScore: number
  scrabbleStatus: HighLowStatus
  alphaStatus: HighLowStatus
  freqStatus: HighLowStatus
  ladderDistance: number
  partialWordleStatus: { status: CharStatus, value: number }
}

export const getStatuses = (
  solution: string,
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}
  const splitSolution = unicodeSplit(solution)

  guesses.forEach((word) => {
    let all_gray = true
    unicodeSplit(word).forEach((letter, i) => {
      if (splitSolution.includes(letter)) {
        all_gray = false
      }
    })
    if (all_gray) {
      unicodeSplit(word).forEach((letter, i) => {
        return (charObj[letter] = 'absent')
      })
    }
  })

  return charObj
}

export const getGuessStatuses = (
  solution: string,
  guess: string
): (CharStatus | undefined)[] => {
  const splitGuess = unicodeSplit(guess)
  return splitGuess.map((char) => undefined)
}

export const getScrabbleScore = (word: string) => {
  const splitWord = unicodeSplit(word)
  return splitWord.reduce(
    (prevScore, c) => prevScore + SCRABBLE_SCORE[c.toLowerCase()],
    0
  )
}

export const getScrabbleStatus = (guess: string, solution: string) => {
  const guessScore = getScrabbleScore(guess)
  const solutionScore = getScrabbleScore(solution)

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

export const getFrequencyStatus = (guess: string, solution: string) => {
  const guessFreq = WORD_FREQ[guess.toLowerCase()]
  const solutionFreq = WORD_FREQ[solution.toLowerCase()]  

  if (guessFreq < solutionFreq) {
    return 'low'
  } else if (guessFreq > solutionFreq) {
    return 'high'
  }
  return 'equal'
}

export const getWordLadderDistance = (word1: string, word2: string) => {
  return ladderLength(word1, word2, VALID_GUESSES_UPPER)
}

export const getPartialWordleStatus = (
  guess: string, 
  solution: string
): { status: CharStatus, value: number } => {
  const guessStatuses = getOriginalGuessStatuses(solution, guess)
  const guessStatusFreq: Map<CharStatus, number> = new Map()
  guessStatusFreq.set('correct', 0)
  guessStatusFreq.set('present', 0)
  guessStatusFreq.set('absent', 0)

  guessStatuses.forEach((status) => {
    guessStatusFreq.set(status, guessStatusFreq.get(status)! + 1)
  })
  if (guessStatusFreq.get('correct')! > 0) {
    return {
      status: 'correct',
      value: guessStatusFreq.get('correct')!
    }
  } else if (guessStatusFreq.get('present')! > 0) {
    return {
      status: 'present',
      value: guessStatusFreq.get('present')!
    }
  } else {
    return {
      status: 'absent',
      value: guessStatusFreq.get('absent')!
    }
  }
}

export const getOriginalGuessStatuses = (
  solution: string,
  guess: string
): CharStatus[] => {
  const splitSolution = unicodeSplit(solution)
  const splitGuess = unicodeSplit(guess)

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(guess.length))

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true
      return
    }
  })

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = 'absent'
      return
    }
  })

  return statuses
}
