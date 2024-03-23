import { destr } from 'destr'
import type { WordlistId } from '~/models/wordlist'

const DEFAULT_WORDLISTS = new Set<WordlistId>([
  'eff-long',
  'eff-short-1',
  'eff-short-2',
  'bip39-en',
  'orchard-street-long',
  'orchard-street-medium',
  'sts10-1password-replacement',
])

export const useWordlistSelection = () => {
  const selectedLists = useCookie<Set<WordlistId>>('wordlist:selection', {
    default: () => DEFAULT_WORDLISTS,
    decode: (value: string) => {
      const parsedArr = destr<WordlistId[]>(value) ?? []
      return new Set<WordlistId>(parsedArr)
    },
    encode: (value) => JSON.stringify(Array.from(value)),
  })

  const addWordlist = (wordlistId: WordlistId) => {
    selectedLists.value.add(wordlistId)
  }

  const removeWordlist = (wordlistId: WordlistId) => {
    selectedLists.value.delete(wordlistId)
  }

  const isWordlistSelected = (wordlistId: WordlistId) => {
    return selectedLists.value.has(wordlistId)
  }

  return {
    selectedLists,
    addWordlist,
    removeWordlist,
    isWordlistSelected,
  }
}
