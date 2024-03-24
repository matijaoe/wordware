/* eslint-disable no-param-reassign */
import Decimal from 'decimal.js-light'
import { max, min, sum } from '.'

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

export const hasDuplicates = (list: string[]) => {
  return new Set(list).size !== list.length
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

export const uniqueCharacterPrefix = (list: string[], _longestWordLength?: number): number => {
  _longestWordLength = _longestWordLength ?? longestWordLength(list) ?? 0

  const longestSharedPrefix = findLongestSharedPrefix(list, _longestWordLength)
  if (longestSharedPrefix < _longestWordLength) {
    return longestSharedPrefix + 1
  }
  return longestSharedPrefix
}

export const assumedEntropyPerUniqueCharacterPrefix = (list: string[], prefixLength?: number) => {
  const _prefixLength = prefixLength ?? uniqueCharacterPrefix(list) ?? 0
  const assumedEntropyPerWord = new Decimal(entropyPerWord(list.length))
  return assumedEntropyPerWord.dividedBy(_prefixLength).todp(3).toNumber()
}

// TODO: the same exact thing as assumedEntropyPerCharacter
export const efficiencyPerCharacter = (list: string[]) => {
  const _meanWordLength = new Decimal(meanWordLength(list))
  const _entropyPerWord = new Decimal(entropyPerWord(list.length))
  return _entropyPerWord.dividedBy(_meanWordLength).todp(3).toNumber()
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

// TODO hasPrefixWords (toy, toyota) - freeOfPrefixWords
// TODO hasSuffixWords (toy, destroy)
// TODO meanEditDistance / shortestEditDistance
