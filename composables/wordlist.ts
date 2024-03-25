import { StorageSerializers } from '@vueuse/core'
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

// TODO: make sure at least one list is selected
// make sure to handle and switch selected list option when that list is removed as a selection option
export const useWordlistSelection = () => {
  // didn't work nicely with set
  const selectedLists = useCookie<Array<WordlistSlug>>('wordlist:selection', {
    default: () => Array.from(DEFAULT_WORDLISTS),

  })

  const addWordlist = (wordlistSlug: WordlistSlug) => {
    // seems it needs to be a new array to always trigger reactivity
    selectedLists.value = [...selectedLists.value, wordlistSlug]
  }

  const removeWordlist = (wordlistSlug: WordlistSlug) => {
    selectedLists.value = selectedLists.value.filter((slug) => slug !== wordlistSlug)
  }

  const checkIfWordlistSelected = (wordlistSlug: WordlistSlug) => {
    return selectedLists.value.includes(wordlistSlug)
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
