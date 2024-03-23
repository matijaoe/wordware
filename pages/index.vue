<script lang="ts" setup>
import type { WordlistSlug } from '~/models/wordlist'

const selectedList = useCookie<WordlistSlug>('selected-wordlist', { default: () => 'eff-long' })
const { selectedLists } = useWordlistSelection()
const { words: currentWordlist } = useWordlist(selectedList)

const wordCount = ref<number>(5)
const wordCountModel = computed<number[]>({
  get: () => [wordCount.value],
  set: ([value]: number[]) => {
    wordCount.value = value
  },
})

const availableSeparators = [
  {
    label: 'space',
    selectValue: 'space',
    value: ' ',
  },
  {
    label: 'dash',
    selectValue: 'dash',
    value: '-',
  },
  {
    label: 'underscore',
    selectValue: 'underscore',
    value: '_',
  },
  {
    label: 'period',
    selectValue: 'period',
    value: '.',
  },
  {
    label: 'comma',
    selectValue: 'comma',
    value: ',',
  },
  {
    label: 'semicolon',
    selectValue: 'semicolon',
    value: ';',
  },
  {
    label: 'forward slash',
    selectValue: 'forward-slash',
    value: '/',
  },
  {
    label: 'at',
    selectValue: 'at',
    value: '@',
  },
  {
    label: 'tilde',
    selectValue: 'tilde',
    value: '~',
  },
  {
    label: 'question mark',
    selectValue: 'question-mark',
    value: '?',
  },
  {
    label: 'tilde',
    selectValue: 'tilde',
    value: '~',
  },
  {
    label: 'plus',
    selectValue: 'plus',
    value: '+',
  },
  {
    label: 'none',
    selectValue: 'none',
    value: '',
  },
]

const separators = ref<Record<'label' | 'selectValue' | 'value', string>[]>(availableSeparators)
const separator = ref<string>('space')

const separatorSymbol = computed(() => {
  return separators.value.find((item) => item.selectValue === separator.value)?.value
})

const isCapitalized = ref<boolean>(false)

const passphrase = ref<string>('')

const passphraseHtml = computed(() => {
  return passphrase.value.replaceAll(
    separatorSymbol.value?.toString() ?? ' ',
    `<span class="text-fuchsia-600">${separatorSymbol.value === ' ' ? '&nbsp;' : separatorSymbol.value}</span>`,
  )
})

const casing = computed<'upper' | 'lower' | 'capitalized'>(() => {
  return isCapitalized.value ? 'capitalized' : 'lower'
})

const setNewPassphrase = () => {
  passphrase.value = generatePassphrase({
    wordlist: currentWordlist.value,
    count: wordCount.value,
    separator: separatorSymbol.value,
    casing: casing.value,
  })
  unselectPassphrase()
}

onMounted(() => {
  watchEffect(() => {
    setNewPassphrase()
  })
})

const passphraseEl = ref<HTMLDivElement>()

const selectPassphrase = () => {
  if (!isDefined(passphraseEl)) {
    return
  }
  const elem = passphraseEl.value
  const range = document.createRange()
  range.selectNodeContents(elem)
  const selection = window.getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)
}
const unselectPassphrase = () => {
  const selection = window.getSelection()
  selection?.removeAllRanges()
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
    <div class="w-full max-w-2xl mx-auto mt-[10vh]">
      <h2 class="text-4xl font-mono text-center text-balance mb-12">
        Generate your secure passphrase
      </h2>

      <button class="block w-full" @click="selectAndCopyPassphrase">
        <!-- TODO: text balance not working with span for each char, or v-html -->
        <div
          ref="passphraseEl"
          class="selection:bg-sky-600/50 break-all flex flex-wrap justify-center content-center gap-y-0 tracking-wide leading-[1.5] font-mono text-center w-full rounded-lg border border-input bg-background px-3 py-3.5 min-h-[138px] text-2xl ring-offset-background"
          v-html="passphraseHtml"
        />
      </button>

      <div class="mt-4 grid grid-cols-4 gap-4 items-center">
        <Button variant="outline" size="default" @click="selectAndCopyPassphrase">
          copy
        </Button>
        <div class="col-span-2">
          <Slider
            v-model="wordCountModel"
            :max="20"
            :step="1"
          />
        </div>
        <Button variant="secondary" size="default" @click="setNewPassphrase">
          generate
        </Button>

        <div class="col-span-2">
          <Select v-model="selectedList" class="text-left">
            <SelectTrigger>
              <SelectValue placeholder="Select a list" />
            </SelectTrigger>
            <SelectContent>
              <WordlistSelectItem
                v-for="list in selectedLists"
                :key="list"
                class="w-full"
                :value="list"
              />
            </SelectContent>
          </Select>
        </div>

        <Select v-model="separator" class="text-left">
          <SelectTrigger>
            <SelectValue placeholder="Pick a separator" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="item in separators"
              :key="item.selectValue"
              :value="item.selectValue"
            >
              <span class="w-full">{{ item.label }}</span>
              <span class="text-muted-foreground ml-1 font-mono">({{ item.value }})</span>
            </SelectItem>
          </SelectContent>
        </Select>

        <BaseTooltip content="Capitalize case">
          <Toggle v-model="isCapitalized" variant="outline" class="flex items-center gap-2" aria-label="Toggle title case" @click="isCapitalized = !isCapitalized">
            <Icon name="ph:text-aa" class="h-4 w-4" /> <span>capitalize</span>
          </Toggle>
        </BaseTooltip>
      </div>
    </div>
  </div>
</template>
