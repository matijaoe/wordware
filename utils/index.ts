const parseLines = (fileStr: string) => {
  const lines = fileStr.trim().split('\n')
  return lines
}

export const parseAsDicewareMap = (fileStr: string) => {
  const lines = parseLines(fileStr)

  const map = new Map<string, string>()
  for (const line of lines) {
    const [num, word] = line.split(/\s+/)
    map.set(num, word)
  }

  return map
}

export const parseAsWordlist = (fileStr: string) => {
  return parseLines(fileStr)
}
