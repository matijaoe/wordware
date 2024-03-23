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
const separator = ref<string>('dash')

const separatorSymbol = computed(() => {
  return separators.value.find((item) => item.selectValue === separator.value)?.value
})

const isCapitalized = ref<boolean>(false)
const isHidden = ref<boolean>(false)

const passphrase = ref<string>('')

const passphraseHtml = computed(() => {
  if (isHidden.value) {
    return '*'.repeat(passphrase.value.length)
  }
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
    <div class="w-fullmt-[10vh]">
      <h2 class="text-4xl font-mono leading-snug text-center text-balance mb-12 max-w-2xl mx-auto ">
        Only passphrase generator you'll ever need
      </h2>

      <button
        class="block w-full max-w-5xl mx-auto"
        @click="selectAndCopyPassphrase"
      >
        <!-- TODO: text balance not working with span for each char, or v-html -->
        <div
          ref="passphraseEl"
          class="selection:bg-indigo-900 break-all flex flex-wrap justify-center content-center gap-y-0 tracking-wide leading-[1.5] font-mono text-center w-full rounded-lg border border-input bg-background px-3 py-3.5 min-h-[138px] text-2xl ring-offset-background"
          v-html="passphraseHtml"
        />
      </button>

      <div class="mt-4 grid grid-cols-4 gap-4 items-center max-w-xl mx-auto ">
        <Button variant="outline" size="default" @click="selectAndCopyPassphrase">
          copy
        </Button>
        <div class="col-span-2">
          <Slider
            v-model="wordCountModel"
            :max="24"
            :min="3"
            :step="1"
          />
        </div>
        <Button variant="default" size="default" @click="setNewPassphrase">
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

        <div class="grid grid-cols-2 gap-4">
          <BaseTooltip content="Capitalize case">
            <Toggle v-model="isCapitalized" variant="outline" class="flex items-center gap-2" aria-label="Toggle title case" @click="isCapitalized = !isCapitalized">
              <Icon name="ph:text-aa" class="text-[1.25em]" />
            </Toggle>
          </BaseTooltip>

          <BaseTooltip content="Hide passphrase">
            <Toggle v-model="isHidden" variant="outline" aria-label="Hide passphrase" @click="isHidden = !isHidden">
              <Icon :name=" isHidden ? 'ph:eye' : 'ph:eye-slash'" class="text-[1.25em]" />
            </Toggle>
          </BaseTooltip>
        </div>
      </div>
    </div>
  </div>
</template>
