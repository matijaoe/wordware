import type { WordlistReference } from '~/models/wordlist'

export const wordlistsReference = [
  {
    slug: 'eff-long',
    name: 'EFF Long Wordlist',
    description: 'Curated by the Electronic Frontier Foundation (EFF) for generating secure passphrases using the Diceware method. Each word is selected to ensure maximum entropy.',
    sourceFile: 'https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt',
    localFile: 'eff_large_wordlist.txt',
    diceware: {
      rollsPerWord: 5,
    },
  },
  {
    slug: 'eff-short-1',
    name: 'EFF Short Wordlist #1',
    description: 'A compact wordlist provided by the Electronic Frontier Foundation (EFF) for creating strong and secure passphrases through the Diceware method.',
    sourceFile: 'https://www.eff.org/files/2016/09/08/eff_short_wordlist_1.txt',
    localFile: 'eff_short_wordlist_1.txt',
    diceware: {
      rollsPerWord: 4,
    },
  },
  {
    slug: 'eff-short-2',
    name: 'EFF Short Wordlist #2',
    description: 'Another concise collection of words by the Electronic Frontier Foundation (EFF) intended for generating strong and memorable passphrases using the Diceware method.',
    sourceFile: 'https://www.eff.org/files/2016/09/08/eff_short_wordlist_2_0.txt',
    localFile: 'eff_short_wordlist_2.txt',
    diceware: {
      rollsPerWord: 4,
    },
  },
  {
    slug: 'reinhold-diceware',
    name: 'Reinhold Diceware Wordlist',
    description: 'The original and still very popular list for using dice to create passphrases.',
    sourceFile: 'https://theworld.com/~reinhold/diceware.wordlist.asc',
    localFile: 'beale-wordlist.txt',
    diceware: {
      rollsPerWord: 5,
    },
  },
  {
    slug: 'beale',
    name: 'Beale Wordlist',
    description: 'Compiled by Arnold G. Reinhold for secure passphrase generation using the Diceware method.',
    sourceFile: 'https://theworld.com/~reinhold/beale.wordlist.asc',
    localFile: 'reinhold-diceware-wordlist.txt',
    diceware: {
      rollsPerWord: 5,
    },
  },
  {
    slug: 'bip39-en',
    name: 'BIP-39 Wordlist',
    description: 'A standardized set of words for the recovery and backup of a bitcoin or cryptocurrency wallet, unique within the first four letters of each word.',
    sourceFile: 'https://raw.githubusercontent.com/bitcoin/bips/master/bip-0039/english.txt',
    localFile: 'bip-39-english.txt',
  },
  {
    slug: 'slip39-en',
    name: 'SLIP-39 Wordlist',
    sourceFile: 'https://raw.githubusercontent.com/satoshilabs/slips/master/slip-0039/wordlist.txt',
    localFile: 'slip-39-english.txt',
  },
  {
    slug: 'orchard-street-long',
    name: 'Orchard Street Long List',
    sourceFile: 'https://raw.githubusercontent.com/sts10/orchard-street-wordlists/main/lists/orchard-street-long.txt',
    localFile: 'orchard-street-long.txt',
  },
  {
    slug: 'orchard-street-medium',
    name: 'Orchard Street Medium List',
    sourceFile: 'https://raw.githubusercontent.com/sts10/orchard-street-wordlists/main/lists/orchard-street-medium.txt',
    localFile: 'orchard-street-medium.txt',
  },
  {
    slug: 'orchard-street-diceware',
    name: 'Orchard Street Diceware List',
    sourceFile: 'https://raw.githubusercontent.com/sts10/orchard-street-wordlists/main/lists/orchard-street-diceware.txt',
    localFile: 'orchard-street-diceware.txt',
    files: [{ label: 'Clean', value: 'https://raw.githubusercontent.com/sts10/orchard-street-wordlists/main/lists/orchard-street-diceware-clean.txt' }],
    diceware: {
      rollsPerWord: 5,
    },
  },
  {
    slug: 'orchard-street-alpha',
    name: 'Orchard Street Alpha Short List',
    sourceFile: 'https://raw.githubusercontent.com/sts10/orchard-street-wordlists/main/lists/orchard-street-alpha-dice.txt',
    localFile: 'orchard-street-alpha-dice.txt',
    files: [{ label: 'Clean', value: 'https://raw.githubusercontent.com/sts10/orchard-street-wordlists/main/lists/orchard-street-alpha.txt' }],
    diceware: {
      rollsPerWord: 4,
    },
  },
  {
    slug: 'orchard-street-qwerty',
    name: 'Orchard Street QWERTY Short List',
    sourceFile: 'https://raw.githubusercontent.com/sts10/orchard-street-wordlists/main/lists/orchard-street-qwerty-dice.txt',
    localFile: 'orchard-street-qwerty-dice.txt',
    files: [{ label: 'Clean', value: 'https://raw.githubusercontent.com/sts10/orchard-street-wordlists/main/lists/orchard-street-qwerty.txt' }],
    diceware: {
      rollsPerWord: 4,
    },
  },
  {
    slug: 'sts10-1password-replacement',
    name: '1Password Replacement List by sts10',
    sourceFile: 'https://raw.githubusercontent.com/sts10/generated-wordlists/main/lists/1password-replacement/1password-replacement.txt',
    localFile: 'sts10-1password-replacement.txt',
  },
  {
    slug: 'agile-words-1password',
    name: 'Agile Words by 1Password',
    sourceFile: 'https://1password.com/txt/agwordlist.txt',
    localFile: 'agile-words-1password.txt',
  },
  {
    slug: 'biglou-bad-words',
    name: 'Biglou Bad Words Wordlist',
    sourceFile: 'https://www.cs.cmu.edu/~biglou/resources/bad-words.txt',
    localFile: 'biglou-bad-words.txt',
  },
  {
    slug: 'securedrop-wordlist',
    name: 'SecureDrop Wordlist',
    sourceFile: 'https://raw.githubusercontent.com/freedomofpress/securedrop/develop/securedrop/wordlists/en.txt',
    localFile: 'securedrop-en.txt',
  },
] satisfies WordlistReference[]
