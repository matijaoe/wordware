import fs from 'node:fs/promises'

export const readFile = async (path: string): Promise<string | null> => {
  try {
    const res = await fs.readFile(path, 'utf8')
    return res
  } catch (err) {
    console.error(err)
    return null
  }
}

export const writeFile = async <T = string>(path: string, content: T): Promise<boolean> => {
  try {
    const contentStr = typeof content === 'string' ? content : JSON.stringify(content, null, 2)
    await fs.writeFile(path, contentStr, 'utf8')
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}
