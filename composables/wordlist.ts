import { destr } from 'destr'
import { WordlistMap } from '~/constants/generated/wordlist-map'
import type { WordlistSlug } from '~/models/wordlist'

const DEFAULT_WORDLISTS = new Set<WordlistSlug>([
  'eff-long',
  'eff-short-1',
  'eff-short-2',
  'bip39-en',
  'orchard-street-long',
  'orchard-street-medium',
  'sts10-1password-replacement',
])

export const useWordlistSelection = () => {
  const selectedLists = useCookie<Set<WordlistSlug>>('wordlist:selection', {
    default: () => DEFAULT_WORDLISTS,
    decode: (value: string) => {
      const parsedArr = destr<WordlistSlug[]>(value) ?? []
      return new Set<WordlistSlug>(parsedArr)
    },
    encode: (value) => JSON.stringify(Array.from(value)),
  })

  const addWordlist = (wordlistSlug: WordlistSlug) => {
    selectedLists.value.add(wordlistSlug)
  }

  const removeWordlist = (wordlistSlug: WordlistSlug) => {
    selectedLists.value.delete(wordlistSlug)
  }

  const checkIfWordlistSelected = (wordlistSlug: WordlistSlug) => {
    return selectedLists.value.has(wordlistSlug)
  }

  return {
    selectedLists,
    addWordlist,
    removeWordlist,
    checkIfWordlistSelected,
  }
}

export const useWordlist = (_wordlistId: MaybeRefOrGetter<WordlistSlug | undefined>) => {
  const wordlistSlug = computed(() => toValue(_wordlistId))

  const wordlist = computed(() => isDefined(wordlistSlug) ? WordlistMap.get(wordlistSlug.value) : undefined)

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
    if (!isDefined(wordlistSlug)) {
      return false
    }
    return checkIfWordlistSelected(wordlistSlug.value)
  })

  return {
    wordlist,
    constructedDescription,
    isWordlistSelected,
  }
}
