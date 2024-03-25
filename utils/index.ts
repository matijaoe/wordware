/* eslint-disable no-param-reassign */
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

export const isNumber = (val: unknown): val is number => {
  try {
    return Number(val) === val
  } catch {
    return false
  }
}

export function sum(array: readonly [number, ...number[]]): number
export function sum(array: readonly number[]): number
export function sum<T>(array: readonly T[], fn: (item: T) => number): number
export function sum<T extends number | object>(
  array: readonly T[],
  fn?: (item: T) => number,
) {
  fn ??= (item: T) => isNumber(item) ? item : 0
  return array?.reduce((acc, item) => acc + fn(item), 0) ?? 0
}

export const boil = <T>(
  array: readonly T[],
  cmp: (a: T, b: T) => T,
) => {
  if (!array.length) {
    return undefined
  }
  return array?.reduce(cmp)
}

export function min(array: readonly [number, ...number[]]): number
export function min(array: readonly number[]): number | undefined
export function min<T>(array: readonly T[], by: (item: T) => number): T | undefined
export function min<T>(
  array: readonly T[],
  by?: (item: T) => number,
): T | undefined {
  by ??= (item: T) => item as unknown as number
  return boil(array, (a, b) => (by(a) < by(b) ? a : b))
}

export function max(array: readonly [number, ...number[]]): number
export function max(array: readonly number[]): number | undefined
export function max<T>(array: readonly T[], by: (item: T) => number): T | undefined
export function max<T>(
  array: readonly T[],
  by?: (item: T) => number,
): T | undefined {
  by ??= (item: T) => item as unknown as number
  return boil(array, (a, b) => (by(a) > by(b) ? a : b))
}

export const isDigit = (char: string) => /\d/.test(char)
export const isLetter = (char: string) => /[a-zA-Z]/.test(char)

export const isAscii = (word: string) => {
  // eslint-disable-next-line no-control-regex
  return /^[\x00-\x7F]*$/.test(word)
}

export const uniq = <T>(array: readonly T[]) => {
  return [...new Set(array)]
}
