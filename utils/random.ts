import { titleCase } from 'scule'
import { getRandomValues } from 'uncrypto'

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

export const generatePassphrase = (props: {
  wordlist: string[]
  count: number
  separator?: string
  casing?: 'lower' | 'upper' | 'capitalized'
}) => {
  const { wordlist, count, separator = ' ', casing = 'lower' } = props
  const listLength = wordlist.length

  const words = []
  for (let i = 0; i < count; i++) {
    const number = secureRandom(listLength)
    let word = wordlist.at(number)!
    switch (casing) {
      case 'lower':
        word = word.toLowerCase()
        break
      case 'upper':
        word = word.toUpperCase()
        break
      case 'capitalized':
        word = titleCase(word)
        break
    }
    words.push(word)
  }
  return words.join(separator)
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
