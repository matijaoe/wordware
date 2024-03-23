<script lang="ts" setup>
import { Wordlists } from '~/constants/generated/wordlists'
import type { WordlistSlug } from '~/models/wordlist'

const passphrase = ref<string>('enjoy-carousal-motivate-smoky')

const selectedList = ref<WordlistSlug>('bip39-en')
const { words: list, listLength } = useWordlist(selectedList)

const wordCount = ref<number>(6)
const separator = ref<string>('-')

const generatePassphrase = () => {
  const words = []
  for (let i = 0; i < wordCount.value; i++) {
    const number = secureRandom(listLength.value)
    const word = list.value.at(number)!
    words.push(word)
  }
  passphrase.value = words.join(separator.value)
}

const passphraseEl = ref<HTMLDivElement>()

const selectPassphrase = () => {
  passphraseEl.value?.focus()
  const range = document.createRange()
  range.selectNodeContents(passphraseEl.value!)
  const selection = window.getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)
}

const copyPassphrase = () => {
  navigator.clipboard.writeText(passphrase.value)
}

const selectAndCopyPassphrase = () => {
  selectPassphrase()
  copyPassphrase()
}
</script>

<template>
  <div>
    <div class="max-w-2xl mx-auto mt-[10vh]">
      <h2 class="text-4xl font-medium text-center text-balance mb-10">
        Generate your secure passphrase
      </h2>

      <button w-full @click="selectAndCopyPassphrase">
        <div ref="passphraseEl" class="tracking-wide leading-[1.5] font-mono text-center w-full rounded-md border border-input bg-background px-3 py-4 text-2xl ring-offset-background">
          {{ passphrase }}
        </div>
      </button>

      <div class="grid grid-cols-2 gap-4 mt-4">
        <Button variant="outline" size="lg" @click="selectAndCopyPassphrase">
          copy secure passphrase
        </Button>
        <Button variant="secondary" size="lg" @click="generatePassphrase">
          generate passphrase
        </Button>
      </div>
    </div>
  </div>
</template>
