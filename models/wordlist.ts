export type Wordlist = {
  name: string
  description?: string
  diceware?: {
    dice: number
    sourceFile?: string
    localFile?: string
  }
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
  sourceFile?: string
  localFile?: string
}

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
  | 'orchard-street-short-alpha'
  | 'orchard-street-short-querty'
  | 'sts10-1password-replacement'
  | '1password-agile'
