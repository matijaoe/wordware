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
  const selectedLists = useCookie<WordlistId[]>('wordlist:selection', {
    default: () => [],
  })

  // const selectedLists = computed({
  //   get: () => new Set(_selectedLists.value ?? []),
  //   set: (wordlistSet: Set<WordlistId>) => {
  //     _selectedLists.value = [...wordlistSet ?? []]
  //   },
  // })

  const addWordlist = (wordlistId: WordlistId) => {
    // selectedLists.value.add(wordlistId)
    return selectedLists.value.push(wordlistId)
  }

  const removeWordlist = (wordlistId: WordlistId) => {
    // selectedLists.value.delete(wordlistId)
    return selectedLists.value.filter((id) => id !== wordlistId)
  }

  const isWordlistSelected = (wordlistId: WordlistId) => {
    // return selectedLists.value.has(wordlistId)
    return selectedLists.value.includes(wordlistId)
  }

  return {
    selectedLists,
    addWordlist,
    removeWordlist,
    isWordlistSelected,
  }
}
