import { destr } from 'destr'
import { camelCase } from 'scule'
import { WordlistMap } from '~/constants/generated/wordlist-map'
import { type WordlistExport, Wordlists } from '~/constants/generated/wordlists'
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
  // TODO: not working reliably, perhaps use local storage and keep cookie in sync?
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

    if (wordlist.value.description) {
      return wordlist.value.description
    }

    const { words, entropyPerWord, efficiencyPerCharacter, entropyPerUniqueCharacterPrefix } = wordlist.value.stats
    return `${words.toLocaleString()} words, ${entropyPerWord} bits of entropy per word, ${efficiencyPerCharacter} bits of entropy per character, ${entropyPerUniqueCharacterPrefix} bits of entropy per unique character prefix`
  })

  const words = computed(() => {
    if (!isDefined(wordlistSlug)) {
      return []
    }

    const exportName = camelCase(wordlistSlug.value) as WordlistExport

    // TODO: this only gets array ones, not Map
    // probably will have to find another way to store and get words
    const res = Wordlists[exportName] as string[]
    return res
  })

  const listLength = computed(() => words.value.length)

  return {
    wordlist,
    constructedDescription,
    words,
    listLength,
  }
}
