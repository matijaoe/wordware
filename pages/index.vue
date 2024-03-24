<script lang="ts" setup>
import type { WordlistSlug } from '~/models/wordlist'

const selectedList = useCookie<WordlistSlug>('selected-wordlist', { default: () => 'eff-long' })
const { selectedLists } = useWordlistSelection()
const { words: wordlistWords, wordlist: currentWordlist } = useWordlist(selectedList)

const wordCount = useCookie<number>('passphrase:word-count', { default: () => 5 })
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
const separator = useLocalStorage<string>('passphrase:separator', 'dash')

const separatorSymbol = computed(() => {
  return separators.value.find((item) => item.selectValue === separator.value)?.value
})

const includeNumber = useLocalStorage<boolean>('passphrase:include-numbers', true)
const isHidden = ref<boolean>(false)

const passphrase = ref<string>('')

const passphraseHtml = computed(() => {
  console.log(passphrase)
  if (isHidden.value) {
    return '*'.repeat(passphrase.value.length)
  }

  const html = passphrase.value.split('').map((char: string) => {
    const digit = isDigit(char)
    if (digit) {
      return `<span class="text-sky-500">${char}</span>`
    }
    if (char === separatorSymbol.value) {
      return `<span class="text-fuchsia-500">${separatorSymbol.value === ' ' ? '&nbsp;' : separatorSymbol.value}</span>`
    }
    return char
  }).join('')

  console.log('finalPhrase :', html)

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
    separator: separatorSymbol.value,
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
            :max="12"
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
                :key="item.selectValue"
                class="text-left"
                :value="item.selectValue"
              >
                <span class="w-full">{{ item.label }}</span>
                <span class="text-muted-foreground ml-1 font-mono">({{ item.value }})</span>
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
            <BaseTooltip content="Titlecase">
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
            <Toggle v-model="includeNumber" :variant="includeNumber ? 'secondary' : 'outline'" aria-label="Include number" @click="includeNumber = !includeNumber">
              <Icon name="ph:number-nine" class="text-[1.25em]" />
            </Toggle>
          </BaseTooltip>
        </div>
      </div>
    </div>
  </div>
</template>
