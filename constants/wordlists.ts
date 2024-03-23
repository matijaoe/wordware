import type { Wordlist, WordlistId } from '~/models/wordlist'

const wordlists = [
  {
    id: 'eff-long',
    name: 'EFF\'s Long Wordlist',
  },
  {
    id: 'eff-short-1',
    name: 'EFF\'s Short Wordlist #1',
  },
  {
    id: 'eff-short-2',
    name: 'EFF\'s Short Wordlist #2',
  },
  {
    id: 'reinhold-diceware',
    name: 'Reinhold Diceware Wordlist',
  },
  {
    id: 'beale',
    name: 'Beale Wordlist',
  },
  {
    id: 'bip39-en',
    name: 'BIP-39 Wordlist',
  },
  {
    id: 'slip39-en',
    name: 'SLIP-39 English Wordlist',
  },
  {
    id: 'orchard-street-long',
    name: 'Orchard Street Long List',
  },
  {
    id: 'orchard-street-medium',
    name: 'Orchard Street Medium List',
  },
  {
    id: 'orchard-street-diceware',
    name: 'Orchard Street Diceware List',
  },
  {
    id: 'orchard-street-short-alpha',
    name: 'Orchard Street Alpha Short List',
  },
  {
    id: 'orchard-street-short-querty',
    name: 'Orchard Street QWERTY Short List',
  },
  {
    id: 'sts10-1password-replacement',
    name: '1Password Replacement List by sts10',
  },
  {
    id: '1password-agile',
    name: 'Agile Words by 1Password',
  },
] satisfies ({ id: WordlistId } & Wordlist)[]

// convert to map by id
export const wordlistMap = new Map<WordlistId, Wordlist>(wordlists.map(({ id, ...rest }) => [id, rest]))
