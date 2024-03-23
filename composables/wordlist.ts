import { destr } from 'destr'
import { WordlistMap } from '~/constants/generated/wordlist-map'
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

  const checkIfWordlistSelected = (wordlistId: WordlistId) => {
    return selectedLists.value.has(wordlistId)
  }

  return {
    selectedLists,
    addWordlist,
    removeWordlist,
    checkIfWordlistSelected,
  }
}

export const useWordlist = (_wordlistId: MaybeRefOrGetter<WordlistId | undefined>) => {
  const wordlistId = computed(() => toValue(_wordlistId))

  const wordlist = computed(() => isDefined(wordlistId) ? WordlistMap.get(wordlistId.value) : undefined)

  // TODO: only temp
  const constructedDescription = computed(() => {
    if (!isDefined(wordlist)) {
      return ''
    }
    const { words, entropyPerWord, entropyPerCharacter } = wordlist.value.stats
    return `${words} words, ${entropyPerWord} bits of entropy per word, ${entropyPerCharacter} bits of entropy per character.`
  })

  const { checkIfWordlistSelected } = useWordlistSelection()

  const isWordlistSelected = computed(() => {
    if (!isDefined(wordlistId)) {
      return false
    }
    return checkIfWordlistSelected(wordlistId.value)
  })

  return {
    wordlist,
    constructedDescription,
    isWordlistSelected,
  }
}
