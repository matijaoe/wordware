/**
 * {@link https://www.reddit.com/r/crypto/comments/4xe21s/comment/d6fduhd}
 */
export function secureRandom(count: number) {
  const rand = new Uint32Array(1)
  const skip = 0x7FFFFFFF - 0x7FFFFFFF % count
  let result

  if (((count - 1) & count) === 0) {
    window.crypto.getRandomValues(rand)
    return rand[0] & (count - 1)
  }
  do {
    window.crypto.getRandomValues(rand)
    result = rand[0] & 0x7FFFFFFF
  } while (result >= skip)
  return result % count
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
