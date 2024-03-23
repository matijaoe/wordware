export type WordlistReference = {
  id: WordlistId
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

export type Wordlist = Omit<WordlistReference, 'id'> & { stats: WordlistAnalysis }

export type WordlistMapModel = Map<WordlistId, Wordlist>

export type WordlistId =
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
  | '1password-agile'
