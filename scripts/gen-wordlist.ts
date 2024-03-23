import { wordlistsReference } from '~/constants/wordlists'
import type { WordlistReference } from '~/models/wordlist'
import { parseAsDicewareMap, parseAsWordlist } from '~/utils'
import { readFile, writeFile } from '~/utils/io'

export const generateWordlist = async (wordlist: WordlistReference) => {
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

for await (const wordlist of wordlistsReference) {
  const written = await generateWordlist(wordlist)
  if (written) {
    console.log(`✅ Generated wordlist datasets: ${wordlist.id}`)
  } else {
    console.log(`❌ Failed to generate wordlist datesets: ${wordlist.id}`)
  }
}
