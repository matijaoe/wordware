import { loadFile } from 'magicast'
import { wordlistsReference } from '~/constants/wordlists'
import type { Wordlist, WordlistId, WordlistReference } from '~/models/wordlist'
import { parseAsDicewareMap, parseAsWordlist } from '~/utils'
import { readFile, writeFile } from '~/utils/io'
import * as Anal from '~/utils/analysis'

const generateWordlistExport = async (wordlist: WordlistReference) => {
  const filePath = (filename: string) => {
    return `public/wordlists/${filename}`
  }

  if (!wordlist?.localFile) {
    return false
  }

  const isDiceWare = !!wordlist.diceware

  const fileStr = await readFile(filePath(wordlist.localFile))
  if (!fileStr) {
    return false
  }

  const outputFilePath = (filename: string) => {
    return `constants/generated/wordlists/${filename}.ts`
  }

  let written = false
  if (isDiceWare) {
    const map = parseAsDicewareMap(fileStr)

    const words = [...map.values()]
    const valuesTemplate = `export default ${JSON.stringify(words, null, 2)}`

    const entries = [...map.entries()]
    const mapTemplate = `export default new Map(${JSON.stringify(entries, null, 2)})`

    const res = await Promise.allSettled([
      writeFile(outputFilePath(wordlist.id), valuesTemplate),
      writeFile(outputFilePath(`${wordlist.id}-diceware`), mapTemplate),
    ])
    written = res.every((r) => r.status === 'fulfilled')
  } else {
    const values = parseAsWordlist(fileStr)
    const template = `export default ${JSON.stringify(values, null, 2)}`
    written = await writeFile(outputFilePath(wordlist.id), template)
  }

  return written
}

const generateWordlistExports = async () => {
  for await (const wordlist of wordlistsReference) {
    const written = await generateWordlistExport(wordlist)
    if (written) {
      console.log(`✅ Generated wordlist datasets: ${wordlist.id}`)
    } else {
      console.log(`❌ Failed to generate wordlist datesets: ${wordlist.id}`)
    }
  }
}

// await generateWordlistExports()

const analyzeWordlist = async (wordlistId: WordlistId) => {
  const filePath = (filename: string) => {
    return `constants/generated/wordlists/${filename}`
  }

  const file = await loadFile(filePath(`${wordlistId}.ts`), {
    range: true,
  })
  const defaultExport = file.exports.default as string[]
  const words = [...defaultExport ?? []]

  if (!words) {
    return undefined
  }

  const wordCount = words.length

  const longestWordExample = Anal.longestWordExample(words) ?? ''
  const shortestWordExample = Anal.shortestWordExample(words) ?? ''
  const shortestWordLength = shortestWordExample.length
  const longestWordLength = longestWordExample.length

  const meanWordLength = Anal.meanWordLength(words)
  const entropyPerWord = Anal.entropyPerWord(wordCount)
  const entropyPerCharacter = Anal.assumedEntropyPerCharacter(words, shortestWordLength)
  const efficiencyPerCharacter = Anal.efficiencyPerCharacter(words)
  const hasDuplicates = Anal.hasDuplicates(words)
  const longestSharedPrefix = Anal.findLongestSharedPrefix(words)
  const uniqueCharacterPrefix = Anal.uniqueCharacterPrefix(words)
  const canBeShortened = Anal.canBeShortened(words)

  const stats = {
    words: wordCount,
    meanWordLength,
    entropyPerWord,
    entropyPerCharacter,
    efficiencyPerCharacter,
    longestWordExample,
    shortestWordExample,
    shortestWordLength,
    longestWordLength,
    hasDuplicates,
    longestSharedPrefix,
    uniqueCharacterPrefix,
    canBeShortened,

  }

  return {
    stats,
  }
}

const res = await analyzeWordlist('orchard-street-diceware')
console.log(res)
