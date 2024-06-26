import { titleCase } from 'scule'
import { getRandomValues } from 'uncrypto'
import type { WordCasingOption } from '~/models'

/**
 * {@link https://www.reddit.com/r/crypto/comments/4xe21s/comment/d6fduhd}
 */
export function secureRandom(count: number) {
  const rand = new Uint32Array(1)
  const skip = 0x7FFFFFFF - 0x7FFFFFFF % count
  let result

  if (((count - 1) & count) === 0) {
    getRandomValues(rand)
    return rand[0] & (count - 1)
  }
  do {
    getRandomValues(rand)
    result = rand[0] & 0x7FFFFFFF
  } while (result >= skip)
  return result % count
}

// TODO: improve options
export const generatePassphrase = (props: {
  wordlist: string[]
  count: number
  separator?: string
  randomNumbersAsSeparator?: boolean
  randomNumberAsSeparatorDigits?: number
  casing?: WordCasingOption
  includeNumber?: boolean
  includeNumberPosition?: 'start' | 'end' // undefined means randomly choses start or end
}) => {
  const {
    wordlist,
    count = 5,
    separator = ' ',
    randomNumbersAsSeparator,
    randomNumberAsSeparatorDigits = 2,
    casing = 'preserve',
    includeNumber = false,
    includeNumberPosition,
  } = props
  const listLength = wordlist.length

  const words = []
  for (let i = 0; i < count; i++) {
    const number = secureRandom(listLength)
    const word = wordlist.at(number)!
    const wordWithCase = applyWordCasing(word, casing)
    words.push(wordWithCase)
  }

  if (includeNumber) {
    const numberPosition = secureRandom(words.length)
    const number = secureRandom(10) // 0-9

    const positions = ['start', 'end'] as const
    const position = includeNumberPosition ?? positions[secureRandom(positions.length)]
    words[numberPosition] = position === 'start'
      ? `${number}${words[numberPosition]}`
      : `${words[numberPosition]}${number}`
  }

  if (randomNumbersAsSeparator) {
    const passphraseParts = []
    // loop over words and add random number as separator
    for (let i = 0; i < count; i++) {
      passphraseParts.push(words[i])
      const isLastWord = i === count - 1

      if (!isLastWord) {
        const numberSeparator = generateExactDigitsNumber(randomNumberAsSeparatorDigits)
        passphraseParts.push(numberSeparator)
      }
    }
    return passphraseParts.join('')
  }

  const passphrase = words.join(separator)
  return passphrase
}

const applyWordCasing = (word: string, casing: WordCasingOption) => {
  let _casing: Omit<WordCasingOption, 'mixed'> = casing === 'mixed' ? 'preserve' : casing
  if (casing === 'mixed') {
    const wordCaseOptions: Omit<WordCasingOption, 'mixed'>[] = ['preserve', 'lowercase', 'uppercase', 'titlecase']
    _casing = wordCaseOptions[secureRandom(wordCaseOptions.length)]
  }

  switch (_casing) {
    case 'lowercase':
      return word.toLowerCase()
    case 'uppercase':
      return word.toUpperCase()
    case 'titlecase':
      return titleCase(word)
    case 'preserve':
    default:
      return word
  }
}

export const generateDicewarePassphrase = (props: {
  wordlist: string[]
  count: number
  separator?: string
}) => {
  const { wordlist, count, separator = ' ' } = props
  const listLength = wordlist.length

  // TODO
}

const generateExactDigitsNumber = (digits: number) => {
  const digitsArr: number[] = []
  for (let j = 0; j < digits; j++) {
    const number = secureRandom(10)
    digitsArr.push(number)
  }
  return digitsArr.join('')
}

// Returns an array of objects of length numWords (default 1).
// Each object in the array represents a word and its index
// and is the result of numRollsPerWord die rolls (default 5).
// function getWords (numWords, numRollsPerWord) {
//   var i,
//       j,
//       words,
//       rollResults,
//       rollResultsJoined

//   words = []

//   if (!numWords) { numWords = 1 }
//   if (!numRollsPerWord) { numRollsPerWord = 5 }

//   for (i = 0; i < numWords; i += 1) {
//     rollResults = []

//     for (j = 0; j < numRollsPerWord; j += 1) {
// 	  // roll a 6 sided die
//       rollResults.push(secureRandom(6) + 1)
//     }

//     rollResultsJoined = rollResults.join('')
//     words.push(getWordFromWordNum(rollResultsJoined)[0])
//   }

//   return words
// }
