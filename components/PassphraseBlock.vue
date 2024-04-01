<script lang="ts" setup>
import type { SeparatorOption } from '~/composables/separators'

const props = defineProps<{
  passphrase: string
  selectedSeparator?: SeparatorOption
  hidden?: boolean
}>()

const EMPTY_SPACE = ' '
const passphraseEl = ref<HTMLDivElement>()

const passphraseHtml = computed(() => {
  if (props.hidden) {
    return '*'.repeat(props.passphrase.length)
  }

  const html = props.passphrase.split('').map((char: string) => {
    const digit = isDigit(char)
    if (digit) {
      return `<span class="text-sky-500">${char}</span>`
    }
    if (!isDefined(props.selectedSeparator)) {
      return char
    }

    // handle all symbols the same, no matter if separator or not?

    const isSymbol = (char: string) => {
      return !isDigit(char) && !isLetter(char)
    }

    const sep = props.selectedSeparator
    if (sep.value !== '<RANDOM_NUMBERS>' && isSymbol(char)) {
      return `<span class="text-fuchsia-500">${char === EMPTY_SPACE ? '&nbsp;' : char}</span>`
    }
    return char
  }).join('')

  return html
})

defineExpose({
  passphraseEl,
})
</script>

<template>
  <div
    ref="passphraseEl"
    class="text-balance selection:bg-indigo-200 dark:selection:bg-indigo-900 break-all flex flex-wrap justify-center content-center gap-y-0 tracking-wide leading-[1.5] font-mono text-center w-full rounded-lg border border-input bg-background px-5 py-3.5 min-h-[140px] text-2xl ring-offset-background"
    v-html="passphraseHtml"
  />
</template>
