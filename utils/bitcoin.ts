import crypto from 'uncrypto'

// Function to convert a string of binary digits to a Uint8Array of bytes
// similar to -0 mode in shasum, although it does not provide the same exact cash, checksum is valid (although using different word)
export const binaryStringToBytes = (binaryString: string) => {
  const bytes = []
  for (let i = 0; i < binaryString.length; i += 8) {
    let byte = 0
    for (let j = 0; j < 8; j++) {
      byte = (byte << 1) | (binaryString[i + j] === '1' ? 1 : 0)
    }
    bytes.push(byte)
  }
  return new Uint8Array(bytes)
}

// Function to calculate SHA-256 hash from a string of binary digits
// takes in 0s and 1s only
export const sha256bitsMode = async (bits: string) => {
  // Convert the input bits string to bytes
  const dataAsBytes = binaryStringToBytes(bits)

  // Calculate SHA-256 hash
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataAsBytes)

  // Convert hashBuffer to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('')

  return hashHex
}
