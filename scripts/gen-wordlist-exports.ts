import fs from 'node:fs/promises'
import * as path from 'node:path'
import { camelCase } from 'scule'
import { wordlistsReference } from '~/constants/wordlist-reference'
import type { WordlistReference } from '~/models/wordlist'
import { parseAsDicewareMap, parseAsWordlist } from '~/utils'
import { readFile, writeFile } from '~/utils/io'

const fileGeneratedComment = (localFile: string) => `
// This file was generated by scripts/gen-wordlist-exports.ts, based on the ${localFile} source file
// Do not modify this file directly`.trim()
const exportDefaultTemplate = (content: string) => `export default ${content}`

const inputFilePath = (filename: string) => {
  return `public/wordlist/${filename}`
}

const outputBaseDir = 'constants/generated/wordlists'

const outputFilePath = (filename: string) => {
  return `${outputBaseDir}/${filename}.ts`
}

const generateWordlistExport = async (wordlist: WordlistReference) => {
  if (!wordlist?.localFile) {
    return false
  }

  const fileStr = await readFile(inputFilePath(wordlist.localFile))
  if (!fileStr) {
    return false
  }

  let written = false

  const supportsDiceWare = !!wordlist.diceware

  const setupTemplate = (content: string) => `${fileGeneratedComment(wordlist.localFile)}\n\n${exportDefaultTemplate(content)}`

  if (supportsDiceWare) {
    const map = parseAsDicewareMap(fileStr)

    const words = [...map.values()]
    const entries = [...map.entries()]

    const valuesTemplate = setupTemplate(JSON.stringify(words, null, 2))
    const mapTemplate = setupTemplate(`new Map(${JSON.stringify(entries, null, 2)})`)

    const res = await Promise.all([
      writeFile(outputFilePath(wordlist.slug), valuesTemplate),
      writeFile(outputFilePath(`${wordlist.slug}-diceware`), mapTemplate),
    ])
    written = res.every(Boolean)
  } else {
    const values = parseAsWordlist(fileStr)
    const template = setupTemplate(JSON.stringify(values, null, 2))
    written = await writeFile(outputFilePath(wordlist.slug), template)
  }

  return written
}

const generateWordlistExports = async () => {
  // delete all filles in the output directory
  const oldFiles = await fs.readdir(outputBaseDir)
  await Promise.all(oldFiles.map((file) => fs.unlink(`${outputBaseDir}/${file}`)))
  console.log('🗑️ Deleted all previous wordlist exports')

  const promises = wordlistsReference.map(async (wordlist) => {
    const written = await generateWordlistExport(wordlist)
    console.log(written
      ? `✅ Generated ${wordlist.slug}.ts`
      : `❌ Failed to generate wordlist datasets: ${wordlist.slug}`,
    )
    return written
  })

  await Promise.all(promises)

  let importsContent = ``

  const files = await fs.readdir(outputBaseDir)
  const wordlistExportNames = []

  for (const file of files) {
    const fileNameWithoutExtension = path.parse(file).name
    const camelCasedName = camelCase(fileNameWithoutExtension)
    wordlistExportNames.push(camelCasedName)
    const importStatement = `import ${camelCasedName} from './${fileNameWithoutExtension}'\n`
    importsContent += importStatement
  }

  const unionType = wordlistExportNames.map((slug) => `'${slug}'`).join(' | ')
  const wordlistExportContent = `export type WordlistExport = ${unionType}\n`

  const exportContent = `export const Wordlists = {\n${files.map((file) => `\t${camelCase(path.parse(file).name)},`).join('\n')}\n}`

  const content = `${fileGeneratedComment('index.ts')}\n\n${importsContent}\n${wordlistExportContent}\n${exportContent}`

  const written = await writeFile(`${outputBaseDir}/index.ts`, content)
  console.log(written
    ? '✅ Generated index.ts file'
    : '❌ Failed to generate index.ts',
  )
}

await generateWordlistExports()
