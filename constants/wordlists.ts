import type { WordlistReference } from '~/models/wordlist'

// TODO:
// - wordlist array with sources
// - from this, write files (as json or as ts?), and on each calculate all possible stats

export const wordlistsReference: WordlistReference[] = [
  {
    id: 'eff-long',
    name: 'EFF\'s Long Wordlist',
    sourceFile: 'https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt',
    localFile: 'eff_large_wordlist.txt',
    diceware: {
      rollsPerWord: 5,
    },
  },
  {
    id: 'eff-short-1',
    name: 'EFF\'s Short Wordlist #1',
    sourceFile: 'https://www.eff.org/files/2016/09/08/eff_short_wordlist_1.txt',
    localFile: 'eff_short_wordlist_1.txt',
    diceware: {
      rollsPerWord: 4,
    },
  },
  {
    id: 'eff-short-2',
    name: 'EFF\'s Short Wordlist #2',
    sourceFile: 'https://www.eff.org/files/2016/09/08/eff_short_wordlist_2_0.txt',
    localFile: 'eff_short_wordlist_2.txt',
    diceware: {
      rollsPerWord: 4,
    },
  },
  {
    id: 'reinhold-diceware',
    name: 'Reinhold Diceware Wordlist',
    sourceFile: 'https://theworld.com/~reinhold/diceware.wordlist.asc',
    localFile: 'beale-wordlist.txt',
    diceware: {
      rollsPerWord: 5,
    },
  },
  {
    id: 'beale',
    name: 'Beale Wordlist',
    sourceFile: 'https://theworld.com/~reinhold/beale.wordlist.asc',
    localFile: 'reinhold-diceware-wordlist.txt',
    diceware: {
      rollsPerWord: 5,
    },
  },
  {
    id: 'bip39-en',
    name: 'BIP-39 Wordlist',
    sourceFile: 'https://raw.githubusercontent.com/bitcoin/bips/master/bip-0039/english.txt',
    localFile: 'bip-39-english.txt',
  },
  {
    id: 'slip39-en',
    name: 'SLIP-39 Wordlist',
    sourceFile: 'https://raw.githubusercontent.com/satoshilabs/slips/master/slip-0039/wordlist.txt',
    localFile: 'slip-39-english.txt',
  },
  {
    id: 'orchard-street-long',
    name: 'Orchard Street Long List',
    sourceFile: 'https://raw.githubusercontent.com/sts10/orchard-street-wordlists/main/lists/orchard-street-long.txt',
    localFile: 'orchard-street-long.txt',
  },
  {
    id: 'orchard-street-medium',
    name: 'Orchard Street Medium List',
    sourceFile: 'https://raw.githubusercontent.com/sts10/orchard-street-wordlists/main/lists/orchard-street-medium.txt',
    localFile: 'orchard-street-medium.txt',
  },
  {
    id: 'orchard-street-diceware',
    name: 'Orchard Street Diceware List',
    sourceFile: 'https://raw.githubusercontent.com/sts10/orchard-street-wordlists/main/lists/orchard-street-diceware.txt',
    localFile: 'orchard-street-diceware.txt',
    files: [{ label: 'Clean', value: 'https://raw.githubusercontent.com/sts10/orchard-street-wordlists/main/lists/orchard-street-diceware-clean.txt' }],
    diceware: {
      rollsPerWord: 5,
    },
  },
  {
    id: 'orchard-street-alpha-dice',
    name: 'Orchard Street Alpha Short List',
    sourceFile: 'https://raw.githubusercontent.com/sts10/orchard-street-wordlists/main/lists/orchard-street-alpha-dice.txt',
    localFile: 'orchard-street-alpha-dice.txt',
    files: [{ label: 'Clean', value: 'https://raw.githubusercontent.com/sts10/orchard-street-wordlists/main/lists/orchard-street-alpha.txt' }],
    diceware: {
      rollsPerWord: 4,
    },
  },
  {
    id: 'orchard-street-qwerty-dice',
    name: 'Orchard Street QWERTY Short List',
    sourceFile: 'https://raw.githubusercontent.com/sts10/orchard-street-wordlists/main/lists/orchard-street-qwerty-dice.txt',
    localFile: 'orchard-street-qwerty-dice.txt',
    files: [{ label: 'Clean', value: 'https://raw.githubusercontent.com/sts10/orchard-street-wordlists/main/lists/orchard-street-qwerty.txt' }],
    diceware: {
      rollsPerWord: 4,
    },
  },
  {
    id: 'sts10-1password-replacement',
    name: '1Password Replacement List by sts10',
    sourceFile: 'https://raw.githubusercontent.com/sts10/generated-wordlists/main/lists/1password-replacement/1password-replacement.txt',
    localFile: 'sts10-1password-replacement.txt',
  },
  {
    id: '1password-agile',
    name: 'Agile Words by 1Password',
    sourceFile: 'https://1password.com/txt/agwordlist.txt',
    localFile: 'agile-words-1password.txt',
  },
]
