<script lang="ts" setup>
import type { WordlistSlug } from '~/models/wordlist'

const selectedList = useCookie<WordlistSlug>('selected-wordlist', { default: () => 'eff-long' })
const { selectedLists } = useWordlistSelection()
const { words: wordlistWords, wordlist: currentWordlist } = useWordlist(selectedList)

const wordCount = useCookie<number>('passphrase:word-count', { default: () => 6 })
const wordCountModel = computed<number[]>({
  get: () => [wordCount.value],
  set: ([value]: number[]) => {
    wordCount.value = value
  },
})

const availableSeparators = [
  {
    label: 'space',
    value: 'space',
    symbol: ' ',
  },
  {
    label: 'dash',
    value: 'dash',
    symbol: '-',
  },
  {
    label: 'underscore',
    value: 'underscore',
    symbol: '_',
  },
  {
    label: 'period',
    value: 'period',
    symbol: '.',
  },
  {
    label: 'comma',
    value: 'comma',
    symbol: ',',
  },
  {
    label: 'semicolon',
    value: 'semicolon',
    symbol: ';',
  },
  {
    label: 'forward slash',
    value: 'forward-slash',
    symbol: '/',
  },
  {
    label: 'at',
    value: 'at',
    symbol: '@',
  },
  {
    label: 'tilde',
    value: 'tilde',
    symbol: '~',
  },
  {
    label: 'question mark',
    value: 'question-mark',
    symbol: '?',
  },
  {
    label: 'exclamation mark',
    value: 'exclamation-mark',
    symbol: '!',
  },
  {
    label: 'plus',
    value: 'plus',
    symbol: '+',
  },
  {
    label: 'equals',
    value: 'equals',
    symbol: '=',
  },
  {
    label: 'ampersand',
    value: 'ampersand',
    symbol: '&',
  },
  {
    label: 'percent',
    value: 'percent',
    symbol: '%',
  },
  {
    label: 'hash',
    value: 'hash',
    symbol: '#',
  },
  {
    label: 'star',
    value: 'star',
    symbol: '*',
  },
  {
    label: 'none',
    value: 'none',
    symbol: '',
  },
  {
    label: 'numbers',
    value: '<RANDOM_NUMBERS>',
    symbol: 'XX',
  },
] as const
type SeparatorValue = typeof availableSeparators[number]['value']

// TODO: rework separators, make them type safe, allow custom separator values, mark custom non-number non-symbol separators as diff color, to diff from regular word
const separators = ref<{ label: string, value: SeparatorValue, symbol: string }[]>([...availableSeparators])
const separator = useLocalStorage<SeparatorValue>('passphrase:separator', 'dash')
const selectedSeparator = computed(() => {
  return separators.value.find((item) => item.value === separator.value)
})

const isSeparatorRandomNumbers = computed(() => {
  return separator.value === '<RANDOM_NUMBERS>'
})

// Extra settings toggles
const includeNumber = useLocalStorage<boolean>('passphrase:include-number', true)
const isHidden = ref<boolean>(false)

// TODO: unselect and disable includeNumber toggle when random numbers as separator selected
watch(separator, (val) => {
  if (val === '<RANDOM_NUMBERS>') {
    includeNumber.value = false
  }
}, { immediate: true })

const passphrase = ref<string>('')
const passphraseHtml = computed(() => {
  if (isHidden.value) {
    return '*'.repeat(passphrase.value.length)
  }

  const html = passphrase.value.split('').map((char: string) => {
    const digit = isDigit(char)
    if (digit) {
      return `<span class="text-sky-500">${char}</span>`
    }
    if (!isDefined(selectedSeparator)) {
      return char
    }

    // handle all symbols the same, no matter if sepertor or not?

    const isSymbol = (char: string) => {
      return !isDigit(char) && !isLetter(char)
    }

    const sep = selectedSeparator.value
    if (sep.value !== '<RANDOM_NUMBERS>' && isSymbol(char)) {
      return `<span class="text-fuchsia-500">${char === ' ' ? '&nbsp;' : char}</span>`
    }
    return char
  }).join('')

  return html
})

type Casing = 'upper' | 'lower' | 'capitalized'
// TODO: ls not working
const casing = ref<Casing>('lower')
watch(casing, (val) => {
  if (!val) {
    casing.value = 'lower'
  }
})

const setNewPassphrase = () => {
  passphrase.value = generatePassphrase({
    wordlist: wordlistWords.value,
    count: wordCount.value,
    separator: selectedSeparator.value?.symbol,
    randomNumbersAsSeparator: isSeparatorRandomNumbers.value,
    casing: casing.value,
    includeNumber: includeNumber.value,
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
    <div class="w-fullmt-[10vh]">
      <h2 class="text-4xl font-mono leading-snug text-center text-balance mb-12 max-w-4xl mx-auto ">
        Sleek passphrase generator
      </h2>

      <button
        class="block w-full max-w-4xl mx-auto"
        @click="selectAndCopyPassphrase"
      >
        <!-- TODO: text balance not working with span for each char, or v-html -->
        <div
          ref="passphraseEl"
          class="selection:bg-indigo-900 break-all flex flex-wrap justify-center content-center gap-y-0 tracking-wide leading-[1.5] font-mono text-center w-full rounded-lg border border-input bg-background px-3 py-3.5 min-h-[138px] text-2xl ring-offset-background"
          v-html="passphraseHtml"
        />
      </button>

      <div class="mt-4 grid grid-cols-4 gap-x-4 gap-y-5 items-end max-w-2xl mx-auto ">
        <div class="col-span-2 flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <Label class="text-sm">Words</Label>
            <Label class="text-sm">{{ wordCount }}</Label>
          </div>

          <Slider
            v-model="wordCountModel"
            :max="15"
            :min="3"
            :step="1"
          />
        </div>

        <Button variant="outline" size="default" @click="selectAndCopyPassphrase">
          Copy
        </Button>

        <Button variant="default" size="default" @click="setNewPassphrase">
          Generate new
        </Button>

        <div class="flex flex-col gap-1.5">
          <Label>Separator</Label>
          <Select v-model="separator">
            <SelectTrigger class="text-left">
              <SelectValue placeholder="Separator" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="item in separators"
                :key="item.value"
                class="text-left"
                :value="item.value"
              >
                <span class="w-full">{{ item.label }}</span>
                <span class="text-muted-foreground ml-1 font-mono">({{ item.symbol }})</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="col-span-2">
          <div class="flex flex-col gap-1.5">
            <Label>Wordlist</Label>
            <Select v-model="selectedList" class="text-left">
              <SelectTrigger>
                <SelectValue placeholder="Select a list">
                  {{ currentWordlist?.name }}
                </SelectValue>
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
        </div>

        <div class="flex flex-col items-start gap-2">
          <Label>Case</Label>
          <ToggleGroup v-model="casing" class="mx-0" type="single">
            <BaseTooltip content="lowercase">
              <ToggleGroupItem value="lower" aria-label="Toggle lowercase" :variant="casing === 'lower' ? 'primary' : 'outline'">
                <Icon name="radix-icons:letter-case-lowercase" class="text-[1.25em]" />
              </ToggleGroupItem>
            </BaseTooltip>
            <BaseTooltip content="UPPERCASE">
              <ToggleGroupItem value="upper" aria-label="Toggle uppercase" :variant="casing === 'upper' ? 'primary' : 'outline'">
                <Icon name="radix-icons:letter-case-uppercase" class="text-[1.25em]" />
              </ToggleGroupItem>
            </BaseTooltip>
            <BaseTooltip content="Title Case">
              <ToggleGroupItem value="capitalized" aria-label="Toggle title case" :variant="casing === 'capitalized' ? 'primary' : 'outline'">
                <Icon name="radix-icons:letter-case-capitalize" class="text-[1.25em]" />
              </ToggleGroupItem>
            </BaseTooltip>
          </ToggleGroup>
        </div>

        <div class="flex gap-1">
          <BaseTooltip :content="isHidden ? 'Show' : 'Hide'">
            <Toggle v-model="isHidden" variant="outline" aria-label="Hide passphrase" @click="isHidden = !isHidden">
              <Icon :name=" isHidden ? 'ph:eye' : 'ph:eye-slash'" class="text-[1.25em]" />
            </Toggle>
          </BaseTooltip>
          <BaseTooltip content="Include number">
            <!-- TODO: disable not working live -->
            <Toggle
              v-model="includeNumber"
              :variant="includeNumber ? 'secondary' : 'outline'"
              aria-label="Include number"
              :disabled="isSeparatorRandomNumbers"
              @click="includeNumber = !includeNumber"
            >
              <Icon name="ph:number-nine" class="text-[1.25em]" />
            </Toggle>
          </BaseTooltip>
        </div>
      </div>
    </div>
  </div>
</template>
