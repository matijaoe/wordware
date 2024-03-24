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
    // same as medium
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
  {
    // TODO: check if in alphabetical order
    slug: 'nickzoic-wordlist',
    name: 'nickzoic Wordlist',
    sourceFile: 'https://raw.githubusercontent.com/nickzoic/word-list/master/word_list.txt',
    localFile: 'nickzoic_word_list.txt',
  },
  {
    slug: 'monero-wordlist',
    name: 'Monero Wordlist',
    sourceFile: 'https://raw.githubusercontent.com/monero-project/monero/master/src/mnemonics/english.h',
    localFile: 'monero-wordlist.txt',
  },
  {
    // same as monero, check, and if so, probably remove
    slug: 'entropy-menmonics-nebulous-labs',
    name: 'Entropy Mnemonics Wordlist',
    sourceFile: 'https://gitlab.com/NebulousLabs/entropy-mnemonics/-/raw/master/english.go',
    localFile: 'entropy-menmonics-nebulous-labs.txt',
  },
  {
    slug: 'mnemonicode-new',
    name: 'Mnemonicode New Wordlist',
    sourceFile: 'https://raw.githubusercontent.com/singpolyma/mnemonicode/master/mn_wordlist.c',
    localFile: 'mnemonicode-new-wordlist.txt',
  },
  {
    slug: 'passwdqc-4k',
    name: 'passwdqc 4k Wordset',
    sourceFile: 'https://web.archive.org/web/20230925094452/https://fossies.org/linux/passwdqc/wordset_4k.c',
    localFile: 'passwdqc-wordset-4k.txt',
  },
  {
    slug: 'google-10k-english',
    name: 'Google 10000 Most Common Words',
    sourceFile: 'https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english.txt',
    localFile: 'google-10k-english.txt',
  },
  // TODO: not passing map gen
  // {
  //   slug: 'nordpass-wordlist',
  //   name: 'Nordpass Wordlist',
  //   sourceFile: 'https://gist.githubusercontent.com/atoponce/4c4692940522947b8611d33d7cf3225d/raw/cd078528f2c2e5dbb8c750f7b2d1a9508c094840/nordpass-word-list.txt',
  //   localFile: 'nordpass-wordlist.txt',
  // },
  {
    slug: 'eyeware-8k',
    name: 'Eyeware 8k Wordlist',
    sourceFile: 'https://raw.githubusercontent.com/celskeggs/eyeware/master/eyeware8k',
    localFile: 'eyeware-8k.txt',
  },
] satisfies WordlistReference[]
// TODO: https://gist.github.com/atoponce/95c4f36f2bc12ec13242a3ccc55023af

// TODO: no reason to keep duplicates (nickzoic)
// TODO: only add EFF fandom improved lists
