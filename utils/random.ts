/**
 * {@link https://www.reddit.com/r/crypto/comments/4xe21s/comment/d6fduhd}
 */
export function secureRandom(count: number) {
  const rand = new Uint32Array(1)
  const skip = 0x7FFFFFFF - 0x7FFFFFFF % count
  let result

  if (((count - 1) & count) === 0) {
    window.crypto.getRandomValues(rand)
    return rand[0] & (count - 1)
  }
  do {
    window.crypto.getRandomValues(rand)
    result = rand[0] & 0x7FFFFFFF
  } while (result >= skip)
  return result % count
}
