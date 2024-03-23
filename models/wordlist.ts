export type WordlistReference = {
  id: WordlistId
  name: string
  description?: string
  diceware?: {
    rollsPerWord: number
  }
  sourceFile?: string
  localFile?: string
  files?: { label: string, value: string }[]
}

export type WordlistCalculated = {
  uniquePrefixChars?: number
  stats?: {
    words: number
    meanWordLength: number
    avgWordLength: number
    entropyPerWord: number
    entropyPerChar: number
    longestWordChars: number
    shortestWordChars: number
  }
}

export type Wordlist = Omit<WordlistReference, 'id'> & WordlistCalculated

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
  | 'orchard-street-alpha-dice'
  | 'orchard-street-qwerty-dice'
  | 'sts10-1password-replacement'
  | '1password-agile'
