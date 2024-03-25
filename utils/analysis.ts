/* eslint-disable no-param-reassign */
import Decimal from 'decimal.js-light'
import { isAscii, isDigit, max, min, sum } from '.'

export const shortestWordExample = (list: string[]) => {
  return min(list, (word) => word.length)
}

export const shortestWordLength = (list: string[]) => {
  return shortestWordExample(list)?.length ?? 0
}

export const longestWordExample = (list: string[]) => {
  return max(list, (word) => word.length)
}

export const longestWordLength = (list: string[]) => {
  return longestWordExample(list)?.length ?? 0
}

export const entropyPerWord = (listLength: number) => {
  return new Decimal(listLength).log(2).todp(3).toNumber()
}

export const meanWordLength = (list: string[]) => {
  const totalCharacters = new Decimal(sum(list, (word) => word.length))
  const wordCount = new Decimal(list.length)
  return totalCharacters.dividedBy(wordCount).todp(2).toNumber()
}

export const convertWordToAscii = (word: string) => {
  return word
    .split('')
    .map((char) => char.charCodeAt(0))
    .join('')
}

export const countUniqueWordsExact = (list: string[]) => {
  const listAsSet = new Set(list)
  return listAsSet.size
}

export const countUniqueWordsFuzzy = (list: string[]) => {
  const words = list.map((word) => word.toLowerCase().trim())
  const listAsSet = new Set(words)
  return listAsSet.size
}

export const hasDuplicatesExact = (list: string[]) => {
  return countUniqueWordsExact(list) < list.length
}

export const hasDuplicatesFuzzy = (list: string[]) => {
  return countUniqueWordsFuzzy(list) < list.length
}

export const hasNonAsciiCharacters = (list: string[]): boolean => {
  // use isAscii method
  return list.some((word) => !isAscii(word))
}

export const isAllLowercase = (list: string[]): boolean => {
  return list.every((word) => word.toLocaleLowerCase() === word)
}
export const isAllUppercase = (list: string[]): boolean => {
  return list.every((word) => word.toLocaleUpperCase() === word)
}

export const hasConsistentCase = (list: string[]): boolean => {
  return isAllLowercase(list) || isAllUppercase(list)
}

export const includesDigits = (list: string[]): boolean => {
  return list.some((word) => isDigit(word))
}

export const hasPrefixWords = (list: string[]): boolean => {
  for (const word1 of list) {
    for (const word2 of list) {
      if (word1 !== word2 && word1.startsWith(word2)) {
        return true
      }
    }
  }
  return false
}

export const hasSuffixWords = (list: string[]): boolean => {
  for (const word1 of list) {
    for (const word2 of list) {
      if (word1 !== word2 && word1.endsWith(word2)) {
        return true
      }
    }
  }
  return false
}

export const countUniqueCharacters = (list: string[], caseInsensitive = false): number => {
  const characters: string[] = []
  if (caseInsensitive) {
    list = list.map((word) => word.toLowerCase())
  }
  for (const word of list) {
    for (const char of word) {
      characters.push(char)
    }
  }
  return new Set(characters).size
}

export const isAboveBruteForceLine = (list: string[], _shortestWordLength?: number): boolean => {
  _shortestWordLength = _shortestWordLength ?? shortestWordLength(list) ?? 0

  const g = new Decimal(26) // roughly: assumed alphabet length
  const listLength = new Decimal(list.length)

  return listLength.lte(g.pow(_shortestWordLength))
}

export const findLongestSharedPrefix = (list: string[], _longestWordLength?: number): number => {
  let longestSharedPrefix = 0

  _longestWordLength = _longestWordLength ?? longestWordLength(list) ?? 0

  for (const word1 of list) {
    for (const word2 of list) {
      if (word1 !== word2) {
        // Here we convert from zero-indexed first different to
        // the (1-indexed) length of the long shared prefix, so we don't
        // need a `- 1`.
        const thisSharedPrefixLength = findFirstDifferentCharacterZeroIndexed(word1, word2)
        if (thisSharedPrefixLength > longestSharedPrefix) {
          longestSharedPrefix = thisSharedPrefixLength
        }
        // If we found a shared prefix that's only one fewer than the longest word on
        // the list, we know this is the longest shared prefix we'll ever find.
        // We can short-circuit return to save time.
        if (thisSharedPrefixLength === _longestWordLength - 1) {
          return thisSharedPrefixLength
        }
      }
    }
  }
  return longestSharedPrefix
}

export const uniqueCharacterPrefix = (list: string[], longestWordLen?: number): number => {
  longestWordLen = longestWordLen ?? longestWordLength(list) ?? 0

  const longestSharedPrefix = findLongestSharedPrefix(list, longestWordLen)
  if (longestSharedPrefix < longestWordLen) {
    return longestSharedPrefix + 1
  }
  return longestSharedPrefix
}

// https://github.com/sts10/wla?tab=readme-ov-file#what-is-efficiency-per-character-and-assumed-entropy-per-char-and-whats-the-difference
export const efficiencyPerCharacter = (list: string[], _meanWordLength?: number) => {
  _meanWordLength = _meanWordLength ?? meanWordLength(list) ?? 0
  // TODO: divide by zero potential error
  const meanWordLengthDec = new Decimal(meanWordLength(list))
  const _entropyPerWord = new Decimal(entropyPerWord(list.length))
  return _entropyPerWord.dividedBy(meanWordLengthDec).todp(3).toNumber()
}

export const assumedEntropyPerCharacter = (list: string[], _shortestWordLength?: number) => {
  _shortestWordLength = _shortestWordLength ?? shortestWordLength(list) ?? 0

  const assumedEntropyPerWord = new Decimal(entropyPerWord(list.length))
  return assumedEntropyPerWord.dividedBy(_shortestWordLength).todp(3).toNumber()
}

// ie has unique prefix shorter than longest word
// TODO: not really relevant in cases whens a long word because of which prefix seems to be unique
export const canBeShortened = (list: string[], _longestWordLength?: number) => {
  _longestWordLength = _longestWordLength ?? longestWordLength(list) ?? 0

  return uniqueCharacterPrefix(list, _longestWordLength) < _longestWordLength
}

function findFirstDifferentCharacterZeroIndexed(word1: string, word2: string): number {
  let i = 0
  while (i < word1.length && i < word2.length && word1[i] === word2[i]) {
    i++
  }
  return i
}
