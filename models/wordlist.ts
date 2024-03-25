export type WordlistReference = {
  slug: WordlistSlug
  name: string
  description?: string
  diceware?: {
    rollsPerWord: number
  }
  sourceFile?: string
  localFile: string
  files?: { label: string, value: string }[]
}

// TODO: organize into sections, thin of better naming for some
export type WordlistAnalysis = {
  words: number
  meanWordLength: number
  entropyPerWord: number
  efficiencyPerCharacter: number
  assumedEntropyPerCharacter: number
  shortestWordExample: string
  longestWordExample: string
  shortestWordLength: number
  longestWordLength: number
  longestSharedPrefix: number
  uniqueCharacterPrefix: number
  canBeShortened: boolean
  hasDuplicatesExact: boolean
  hasDuplicatesFuzzy: boolean
  uniqueWordsFoundExact: number
  uniqueWordsFoundFuzzy: number
  uniqueCharactersExact: number
  uniqueCharactersFuzzy: number
  hasNonAsciiCharacters: boolean
  isAllLowercase: boolean
  hasConsistentCase: boolean
  hasNumbers: boolean
  freeOfPrefixWords: boolean
  freeOfSuffixWords: boolean
  // uniquelyDecodable: boolean
  isAboveBruteForceLine: boolean
}

export type Wordlist = WordlistReference & {
  sample: string[]
  stats: WordlistAnalysis
}

export type WordlistMapModel = Map<WordlistSlug, Wordlist>

export type WordlistSlug =
  | 'eff-long'
  | 'eff-short-1'
  | 'eff-short-2'
  | 'reinhold-diceware'
  | 'beale'
  | 'bip39-en'
  | 'slip39-en'
  | 'orchard-street-long'
  | 'orchard-street-medium'
  | 'orchard-street-diceware'
  | 'orchard-street-alpha'
  | 'orchard-street-qwerty'
  | 'sts10-1password-replacement'
  | 'agile-words-1password'
  | 'biglou-bad-words'
  | 'securedrop-wordlist'
  | 'nickzoic-wordlist'
  | 'monero-wordlist'
  | 'entropy-menmonics-nebulous-labs'
  | 'mnemonicode-new'
  | 'passwdqc-4k'
  | 'google-10k-english'
  | 'eyeware-8k'
