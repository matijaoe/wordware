// This file was generated by scripts/gen-wordlist-map.ts
// Do not modify this file directly

import type { Wordlist, WordlistSlug } from '~/models/wordlist'

export const WordlistMap = new Map<WordlistSlug, Wordlist>([
  [
    "eff-long",
    {
      "slug": "eff-long",
      "name": "EFF's Long Wordlist",
      "description": "Curated by the Electronic Frontier Foundation (EFF) for generating secure passphrases using the Diceware method. Each word is selected to ensure maximum entropy.",
      "sourceFile": "https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt",
      "localFile": "eff_large_wordlist.txt",
      "diceware": {
        "rollsPerWord": 5
      },
      "sample": [
        "abacus",
        "abdomen",
        "abdominal",
        "abide",
        "abiding",
        "ability",
        "ablaze",
        "able",
        "abnormal",
        "abrasion",
        "abrasive",
        "abreast",
        "abridge",
        "abroad",
        "abruptly",
        "absence",
        "absentee",
        "absently",
        "absinthe",
        "absolute",
        "absolve",
        "abstain",
        "abstract",
        "absurd",
        "accent",
        "acclaim",
        "acclimate",
        "accompany",
        "account",
        "accuracy"
      ],
      "stats": {
        "words": 7776,
        "meanWordLength": 6.99,
        "entropyPerWord": 12.925,
        "efficiencyPerCharacter": 1.849,
        "entropyPerUniqueCharacterPrefix": 1.436,
        "longestWordExample": "zoologist",
        "shortestWordExample": "zit",
        "shortestWordLength": 3,
        "longestWordLength": 9,
        "longestSharedPrefix": 8,
        "uniqueCharacterPrefix": 9,
        "canBeShortened": false,
        "hasDuplicates": false
      }
    }
  ],
  [
    "eff-short-1",
    {
      "slug": "eff-short-1",
      "name": "EFF's Short Wordlist #1",
      "description": "A compact wordlist provided by the Electronic Frontier Foundation (EFF) for creating strong and secure passphrases through the Diceware method.",
      "sourceFile": "https://www.eff.org/files/2016/09/08/eff_short_wordlist_1.txt",
      "localFile": "eff_short_wordlist_1.txt",
      "diceware": {
        "rollsPerWord": 4
      },
      "sample": [
        "acid",
        "acorn",
        "acre",
        "acts",
        "afar",
        "affix",
        "aged",
        "agent",
        "agile",
        "aging",
        "agony",
        "ahead",
        "aide",
        "aids",
        "aim",
        "ajar",
        "alarm",
        "alias",
        "alibi",
        "alien",
        "alike",
        "alive",
        "aloe",
        "aloft",
        "aloha",
        "alone",
        "amend",
        "amino",
        "ample",
        "amuse"
      ],
      "stats": {
        "words": 1296,
        "meanWordLength": 4.54,
        "entropyPerWord": 10.34,
        "efficiencyPerCharacter": 2.278,
        "entropyPerUniqueCharacterPrefix": 2.068,
        "longestWordExample": "zippy",
        "shortestWordExample": "yam",
        "shortestWordLength": 3,
        "longestWordLength": 5,
        "longestSharedPrefix": 4,
        "uniqueCharacterPrefix": 5,
        "canBeShortened": false,
        "hasDuplicates": false
      }
    }
  ],
  [
    "eff-short-2",
    {
      "slug": "eff-short-2",
      "name": "EFF's Short Wordlist #2",
      "description": "Another concise collection of words by the Electronic Frontier Foundation (EFF) intended for generating strong and memorable passphrases using the Diceware method.",
      "sourceFile": "https://www.eff.org/files/2016/09/08/eff_short_wordlist_2_0.txt",
      "localFile": "eff_short_wordlist_2.txt",
      "diceware": {
        "rollsPerWord": 4
      },
      "sample": [
        "aardvark",
        "abandoned",
        "abbreviate",
        "abdomen",
        "abhorrence",
        "abiding",
        "abnormal",
        "abrasion",
        "absorbing",
        "abundant",
        "abyss",
        "academy",
        "accountant",
        "acetone",
        "achiness",
        "acid",
        "acoustics",
        "acquire",
        "acrobat",
        "actress",
        "acuteness",
        "aerosol",
        "aesthetic",
        "affidavit",
        "afloat",
        "afraid",
        "aftershave",
        "again",
        "agency",
        "aggressor"
      ],
      "stats": {
        "words": 1296,
        "meanWordLength": 7.32,
        "entropyPerWord": 10.34,
        "efficiencyPerCharacter": 1.413,
        "entropyPerUniqueCharacterPrefix": 3.447,
        "longestWordExample": "wrongdoing",
        "shortestWordExample": "pry",
        "shortestWordLength": 3,
        "longestWordLength": 10,
        "longestSharedPrefix": 2,
        "uniqueCharacterPrefix": 3,
        "canBeShortened": true,
        "hasDuplicates": false
      }
    }
  ],
  [
    "reinhold-diceware",
    {
      "slug": "reinhold-diceware",
      "name": "Reinhold Diceware Wordlist",
      "description": "Compiled by Arnold G. Reinhold for secure passphrase generation using the Diceware method.",
      "sourceFile": "https://theworld.com/~reinhold/diceware.wordlist.asc",
      "localFile": "beale-wordlist.txt",
      "diceware": {
        "rollsPerWord": 5
      },
      "sample": [
        "a",
        "a's",
        "a-1",
        "a-z",
        "aa",
        "aaa",
        "aaaa",
        "aaron",
        "ab",
        "aback",
        "abacus",
        "abase",
        "abash",
        "abate",
        "abbey",
        "abbot",
        "abbr",
        "abby",
        "abc",
        "abc's",
        "abcd",
        "abduct",
        "abdul",
        "abe",
        "abed",
        "abel",
        "abet",
        "abhor",
        "abide",
        "ablaze"
      ],
      "stats": {
        "words": 7776,
        "meanWordLength": 4.23,
        "entropyPerWord": 12.925,
        "efficiencyPerCharacter": 3.056,
        "entropyPerUniqueCharacterPrefix": 2.154,
        "longestWordExample": "zigzag",
        "shortestWordExample": "@",
        "shortestWordLength": 1,
        "longestWordLength": 6,
        "longestSharedPrefix": 5,
        "uniqueCharacterPrefix": 6,
        "canBeShortened": false,
        "hasDuplicates": false
      }
    }
  ],
  [
    "beale",
    {
      "slug": "beale",
      "name": "Beale Wordlist",
      "description": "Compiled by Arnold G. Reinhold for secure passphrase generation using the Diceware method.",
      "sourceFile": "https://theworld.com/~reinhold/beale.wordlist.asc",
      "localFile": "reinhold-diceware-wordlist.txt",
      "diceware": {
        "rollsPerWord": 5
      },
      "sample": [
        "a",
        "a&p",
        "a's",
        "aa",
        "aaa",
        "aaaa",
        "aaron",
        "ab",
        "aba",
        "ababa",
        "aback",
        "abase",
        "abash",
        "abate",
        "abbas",
        "abbe",
        "abbey",
        "abbot",
        "abbott",
        "abc",
        "abe",
        "abed",
        "abel",
        "abet",
        "abide",
        "abject",
        "ablaze",
        "able",
        "abner",
        "abo"
      ],
      "stats": {
        "words": 7776,
        "meanWordLength": 4.24,
        "entropyPerWord": 12.925,
        "efficiencyPerCharacter": 3.048,
        "entropyPerUniqueCharacterPrefix": 2.154,
        "longestWordExample": "zurich",
        "shortestWordExample": "@",
        "shortestWordLength": 1,
        "longestWordLength": 6,
        "longestSharedPrefix": 5,
        "uniqueCharacterPrefix": 6,
        "canBeShortened": false,
        "hasDuplicates": false
      }
    }
  ],
  [
    "bip39-en",
    {
      "slug": "bip39-en",
      "name": "BIP-39 Wordlist",
      "description": "A standardized set of words for the recovery and backup of a bitcoin or cryptocurrency wallet, unique within the first four letters of each word.",
      "sourceFile": "https://raw.githubusercontent.com/bitcoin/bips/master/bip-0039/english.txt",
      "localFile": "bip-39-english.txt",
      "sample": [
        "abandon",
        "ability",
        "able",
        "about",
        "above",
        "absent",
        "absorb",
        "abstract",
        "absurd",
        "abuse",
        "access",
        "accident",
        "account",
        "accuse",
        "achieve",
        "acid",
        "acoustic",
        "acquire",
        "across",
        "act",
        "action",
        "actor",
        "actress",
        "actual",
        "adapt",
        "add",
        "addict",
        "address",
        "adjust",
        "admit"
      ],
      "stats": {
        "words": 2048,
        "meanWordLength": 5.4,
        "entropyPerWord": 11,
        "efficiencyPerCharacter": 2.037,
        "entropyPerUniqueCharacterPrefix": 2.75,
        "longestWordExample": "universe",
        "shortestWordExample": "zoo",
        "shortestWordLength": 3,
        "longestWordLength": 8,
        "longestSharedPrefix": 3,
        "uniqueCharacterPrefix": 4,
        "canBeShortened": true,
        "hasDuplicates": false
      }
    }
  ],
  [
    "slip39-en",
    {
      "slug": "slip39-en",
      "name": "SLIP-39 Wordlist",
      "sourceFile": "https://raw.githubusercontent.com/satoshilabs/slips/master/slip-0039/wordlist.txt",
      "localFile": "slip-39-english.txt",
      "sample": [
        "academic",
        "acid",
        "acne",
        "acquire",
        "acrobat",
        "activity",
        "actress",
        "adapt",
        "adequate",
        "adjust",
        "admit",
        "adorn",
        "adult",
        "advance",
        "advocate",
        "afraid",
        "again",
        "agency",
        "agree",
        "aide",
        "aircraft",
        "airline",
        "airport",
        "ajar",
        "alarm",
        "album",
        "alcohol",
        "alien",
        "alive",
        "alpha"
      ],
      "stats": {
        "words": 1024,
        "meanWordLength": 6.06,
        "entropyPerWord": 10,
        "efficiencyPerCharacter": 1.65,
        "entropyPerUniqueCharacterPrefix": 2.5,
        "longestWordExample": "withdraw",
        "shortestWordExample": "zero",
        "shortestWordLength": 4,
        "longestWordLength": 8,
        "longestSharedPrefix": 3,
        "uniqueCharacterPrefix": 4,
        "canBeShortened": true,
        "hasDuplicates": false
      }
    }
  ],
  [
    "orchard-street-long",
    {
      "slug": "orchard-street-long",
      "name": "Orchard Street Long List",
      "sourceFile": "https://raw.githubusercontent.com/sts10/orchard-street-wordlists/main/lists/orchard-street-long.txt",
      "localFile": "orchard-street-long.txt",
      "sample": [
        "abandon",
        "abandoned",
        "abandoning",
        "abandonment",
        "abatement",
        "abbey",
        "abbot",
        "abbreviated",
        "abbreviation",
        "abbreviations",
        "abdomen",
        "abdominal",
        "abducted",
        "abduction",
        "aberration",
        "aberrations",
        "abide",
        "abiding",
        "abnormal",
        "abnormalities",
        "abnormality",
        "abnormally",
        "abode",
        "abolish",
        "abolished",
        "abolition",
        "abolitionist",
        "abolitionists",
        "aboriginal",
        "aborigines"
      ],
      "stats": {
        "words": 17576,
        "meanWordLength": 7.98,
        "entropyPerWord": 14.101,
        "efficiencyPerCharacter": 1.767,
        "entropyPerUniqueCharacterPrefix": 0.94,
        "longestWordExample": "troubleshooting",
        "shortestWordExample": "zoo",
        "shortestWordLength": 3,
        "longestWordLength": 15,
        "longestSharedPrefix": 14,
        "uniqueCharacterPrefix": 15,
        "canBeShortened": false,
        "hasDuplicates": false
      }
    }
  ],
  [
    "orchard-street-medium",
    {
      "slug": "orchard-street-medium",
      "name": "Orchard Street Medium List",
      "sourceFile": "https://raw.githubusercontent.com/sts10/orchard-street-wordlists/main/lists/orchard-street-medium.txt",
      "localFile": "orchard-street-medium.txt",
      "sample": [
        "abandon",
        "abandoned",
        "abbey",
        "abbot",
        "abdomen",
        "abdominal",
        "abilities",
        "abnormal",
        "aboard",
        "abolished",
        "abolition",
        "aboriginal",
        "above",
        "abroad",
        "abruptly",
        "absence",
        "absent",
        "absolute",
        "absolutely",
        "absorb",
        "absorbed",
        "absorption",
        "abstract",
        "absurd",
        "abundance",
        "abundant",
        "abused",
        "academic",
        "academics",
        "academy"
      ],
      "stats": {
        "words": 7776,
        "meanWordLength": 7.05,
        "entropyPerWord": 12.925,
        "efficiencyPerCharacter": 1.833,
        "entropyPerUniqueCharacterPrefix": 1.293,
        "longestWordExample": "worthwhile",
        "shortestWordExample": "zoo",
        "shortestWordLength": 3,
        "longestWordLength": 10,
        "longestSharedPrefix": 9,
        "uniqueCharacterPrefix": 10,
        "canBeShortened": false,
        "hasDuplicates": false
      }
    }
  ],
  [
    "orchard-street-diceware",
    {
      "slug": "orchard-street-diceware",
      "name": "Orchard Street Diceware List",
      "sourceFile": "https://raw.githubusercontent.com/sts10/orchard-street-wordlists/main/lists/orchard-street-diceware.txt",
      "localFile": "orchard-street-diceware.txt",
      "files": [
        {
          "label": "Clean",
          "value": "https://raw.githubusercontent.com/sts10/orchard-street-wordlists/main/lists/orchard-street-diceware-clean.txt"
        }
      ],
      "diceware": {
        "rollsPerWord": 5
      },
      "sample": [
        "abandon",
        "abandoned",
        "abbey",
        "abbot",
        "abdomen",
        "abdominal",
        "abilities",
        "abnormal",
        "aboard",
        "abolished",
        "abolition",
        "aboriginal",
        "abortion",
        "above",
        "abroad",
        "abruptly",
        "absence",
        "absent",
        "absolute",
        "absolutely",
        "absorb",
        "absorbed",
        "absorption",
        "abstract",
        "absurd",
        "abundance",
        "abundant",
        "abuse",
        "abused",
        "academic"
      ],
      "stats": {
        "words": 7776,
        "meanWordLength": 7.05,
        "entropyPerWord": 12.925,
        "efficiencyPerCharacter": 1.833,
        "entropyPerUniqueCharacterPrefix": 1.293,
        "longestWordExample": "worthwhile",
        "shortestWordExample": "zoo",
        "shortestWordLength": 3,
        "longestWordLength": 10,
        "longestSharedPrefix": 9,
        "uniqueCharacterPrefix": 10,
        "canBeShortened": false,
        "hasDuplicates": false
      }
    }
  ],
  [
    "orchard-street-alpha",
    {
      "slug": "orchard-street-alpha",
      "name": "Orchard Street Alpha Short List",
      "sourceFile": "https://raw.githubusercontent.com/sts10/orchard-street-wordlists/main/lists/orchard-street-alpha-dice.txt",
      "localFile": "orchard-street-alpha-dice.txt",
      "files": [
        {
          "label": "Clean",
          "value": "https://raw.githubusercontent.com/sts10/orchard-street-wordlists/main/lists/orchard-street-alpha.txt"
        }
      ],
      "diceware": {
        "rollsPerWord": 4
      },
      "sample": [
        "abbot",
        "abide",
        "abode",
        "above",
        "account",
        "ache",
        "acid",
        "acidic",
        "acre",
        "acts",
        "add",
        "added",
        "adds",
        "ads",
        "again",
        "aged",
        "aging",
        "ago",
        "agony",
        "agree",
        "aide",
        "aided",
        "aim",
        "aims",
        "akin",
        "amid",
        "amino",
        "among",
        "amount",
        "ante"
      ],
      "stats": {
        "words": 1296,
        "meanWordLength": 4.12,
        "entropyPerWord": 10.34,
        "efficiencyPerCharacter": 2.51,
        "entropyPerUniqueCharacterPrefix": 1.477,
        "longestWordExample": "stopped",
        "shortestWordExample": "zoo",
        "shortestWordLength": 3,
        "longestWordLength": 7,
        "longestSharedPrefix": 6,
        "uniqueCharacterPrefix": 7,
        "canBeShortened": false,
        "hasDuplicates": false
      }
    }
  ],
  [
    "orchard-street-qwerty",
    {
      "slug": "orchard-street-qwerty",
      "name": "Orchard Street QWERTY Short List",
      "sourceFile": "https://raw.githubusercontent.com/sts10/orchard-street-wordlists/main/lists/orchard-street-qwerty-dice.txt",
      "localFile": "orchard-street-qwerty-dice.txt",
      "files": [
        {
          "label": "Clean",
          "value": "https://raw.githubusercontent.com/sts10/orchard-street-wordlists/main/lists/orchard-street-qwerty.txt"
        }
      ],
      "diceware": {
        "rollsPerWord": 4
      },
      "sample": [
        "access",
        "ache",
        "acre",
        "acres",
        "acted",
        "acts",
        "add",
        "added",
        "address",
        "adds",
        "ago",
        "agree",
        "agreed",
        "agrees",
        "aid",
        "aim",
        "air",
        "akin",
        "ally",
        "alt",
        "amp",
        "anew",
        "ante",
        "any",
        "app",
        "arc",
        "arch",
        "area",
        "areas",
        "army"
      ],
      "stats": {
        "words": 1296,
        "meanWordLength": 4.24,
        "entropyPerWord": 10.34,
        "efficiencyPerCharacter": 2.439,
        "entropyPerUniqueCharacterPrefix": 1.477,
        "longestWordExample": "referred",
        "shortestWordExample": "zoo",
        "shortestWordLength": 3,
        "longestWordLength": 8,
        "longestSharedPrefix": 6,
        "uniqueCharacterPrefix": 7,
        "canBeShortened": true,
        "hasDuplicates": false
      }
    }
  ],
  [
    "sts10-1password-replacement",
    {
      "slug": "sts10-1password-replacement",
      "name": "1Password Replacement List by sts10",
      "sourceFile": "https://raw.githubusercontent.com/sts10/generated-wordlists/main/lists/1password-replacement/1password-replacement.txt",
      "localFile": "sts10-1password-replacement.txt",
      "sample": [
        "aback",
        "abandon",
        "abandoned",
        "abandoning",
        "abatement",
        "abbey",
        "abbot",
        "abdication",
        "abdomen",
        "abdominal",
        "abducted",
        "abduction",
        "aberrant",
        "aberration",
        "abide",
        "abiding",
        "abilities",
        "ability",
        "abject",
        "able",
        "abnormal",
        "abnormally",
        "aboard",
        "abode",
        "abolish",
        "abolished",
        "abolishing",
        "abolition",
        "aboriginal",
        "aborigines"
      ],
      "stats": {
        "words": 18325,
        "meanWordLength": 7.12,
        "entropyPerWord": 14.162,
        "efficiencyPerCharacter": 1.989,
        "entropyPerUniqueCharacterPrefix": 1.416,
        "longestWordExample": "zoological",
        "shortestWordExample": "zoo",
        "shortestWordLength": 3,
        "longestWordLength": 10,
        "longestSharedPrefix": 9,
        "uniqueCharacterPrefix": 10,
        "canBeShortened": false,
        "hasDuplicates": false
      }
    }
  ],
  [
    "agile-words-1password",
    {
      "slug": "agile-words-1password",
      "name": "Agile Words by 1Password",
      "sourceFile": "https://1password.com/txt/agwordlist.txt",
      "localFile": "agile-words-1password.txt",
      "sample": [
        "aardvark",
        "abaci",
        "aback",
        "abacus",
        "abaft",
        "abalone",
        "abandon",
        "abase",
        "abash",
        "abate",
        "abatis",
        "abattoir",
        "abbacy",
        "abbe",
        "abbess",
        "abbey",
        "abbot",
        "abdias",
        "abdicate",
        "abdomen",
        "abduct",
        "abe",
        "abeam",
        "abed",
        "abel",
        "aberrant",
        "aberrate",
        "abet",
        "abeyance",
        "abeyant"
      ],
      "stats": {
        "words": 18328,
        "meanWordLength": 6.2,
        "entropyPerWord": 14.162,
        "efficiencyPerCharacter": 2.284,
        "entropyPerUniqueCharacterPrefix": 1.77,
        "longestWordExample": "zwieback",
        "shortestWordExample": "you",
        "shortestWordLength": 3,
        "longestWordLength": 8,
        "longestSharedPrefix": 7,
        "uniqueCharacterPrefix": 8,
        "canBeShortened": false,
        "hasDuplicates": false
      }
    }
  ]
])