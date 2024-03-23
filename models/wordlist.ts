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

export type WordlistAnalysis = {
  words: number
  meanWordLength: number
  entropyPerWord: number
  entropyPerCharacter: number
  entropyPerUniqueCharacterPrefix: number
  efficiencyPerCharacter: number
  shortestWordExample: string
  longestWordExample: string
  shortestWordLength: number
  longestWordLength: number
  longestSharedPrefix: number
  uniqueCharacterPrefix: number
  canBeShortened: boolean
  hasDuplicates: boolean
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
