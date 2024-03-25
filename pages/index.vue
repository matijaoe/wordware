<script lang="ts" setup>
import type { WordlistSlug } from '~/models/wordlist'
import type { WordCasingOption } from '~/models'

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

// Extra settings toggles
const includeNumber = useCookie<boolean>('passphrase:include-number', { default: () => false })
const isHidden = ref<boolean>(false)

const {
  EMPTY_SPACE,
  modeSeparators,
  spaceSeparators,
  symbolSeparators,
  separatorOptions,
} = useSeparators()

const separator = useCookie<SeparatorValue>('passphrase:separator', { default: () => 'space' })
const selectedSeparator = computed(() => separatorOptions.find((item) => item.value === separator.value))
const isSeparatorCustom = computed(() => separator.value === '<CUSTOM>')
const isSeparatorRandomNumbers = computed(() => separator.value === '<RANDOM_NUMBERS>')

const { customSeparator, customSeparatorEl, resetCustomSeparator } = useCustomSeparator()

const isSpecialOrModeSeparator = (value: SeparatorValue) => {
  // @ts-expect-error
  return [...modeSeparators, ...spaceSeparators].map((s) => s.value).includes(value)
}

// unselect and disable includeNumber toggle when random numbers as separator selected
// TODO: always show custom separator input, but switch to custom or any when starting to type (and when it isnt matching others?)
watch(separator, (val) => {
  if (val === '<RANDOM_NUMBERS>') {
    includeNumber.value = false
  } else if (val !== '<CUSTOM>') {
    resetCustomSeparator()
  }
}, { immediate: true })

function useCustomSeparator() {
  const DEFAULT_CUSTOM_SEPARATOR = EMPTY_SPACE

  const customSeparator = useCookie<string>('passphrase:custom-separator', { default: () => DEFAULT_CUSTOM_SEPARATOR })
  const customSeparatorEl = ref<{ inputEl: HTMLInputElement, focus: () => void }>()

  const resetCustomSeparator = () => {
    customSeparator.value = DEFAULT_CUSTOM_SEPARATOR
  }

  watch(customSeparator, (val) => {
    if (val.length === 1) {
      return
    }

    customSeparator.value ||= DEFAULT_CUSTOM_SEPARATOR

    if (val.length > 1) {
      // restrict to single character (last input takes precedence)
      const last = val.trimStart().at(-1) ?? DEFAULT_CUSTOM_SEPARATOR
      customSeparator.value = last
    }
  }, { flush: 'post', immediate: true })

  return {
    customSeparator,
    customSeparatorEl,
    resetCustomSeparator,
  }
}

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
      return `<span class="text-fuchsia-500">${char === EMPTY_SPACE ? '&nbsp;' : char}</span>`
    }
    return char
  }).join('')

  return html
})

const calculatedEntropy = computed(() => {
  // TODO: only taking words into consideration for now
  if (!isDefined(currentWordlist) || !isDefined(passphrase)) {
    return undefined
  }
  const entropyPerWord = currentWordlist.value?.stats.entropyPerWord
  const entropy = entropyPerWord * wordCount.value
  return entropy.toFixed(2)
})

// TODO: some wordlist could have mixed casing already, make the default be keep case, and add mixed case option as well
// TODO: ls not working
const casing = useCookie<WordCasingOption>('passphrase:casing', { default: () => 'preserve' })

const setNewPassphrase = () => {
  // TODO: turn to computed
  const _separator = isSeparatorCustom.value
    ? customSeparator.value
    : selectedSeparator.value?.symbol ?? EMPTY_SPACE

  passphrase.value = generatePassphrase({
    wordlist: wordlistWords.value,
    count: wordCount.value,
    separator: _separator,
    randomNumbersAsSeparator: isSeparatorRandomNumbers.value,
    randomNumberAsSeparatorDigits: 2,
    casing: casing.value,
    includeNumber: includeNumber.value,
    includeNumberPosition: undefined, // start or end
  })
}

// wrapped in onMounted because of hydration errors otherwise (2 differrent passphrases shown one after another on first load)
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

const copyPassphrase = () => {
  navigator.clipboard.writeText(passphrase.value)
}

const selectAndCopyPassphrase = () => {
  selectPassphrase()
  copyPassphrase()
}

const { g, c /* keys you want to monitor */ } = useMagicKeys()

// TODO: disable when custom separator input focused
const activeEl = useActiveElement()
const isBodyActive = computed(() => activeEl.value?.tagName === 'BODY')
const isCopyBtnActive = computed(() => activeEl.value?.id === 'copy-btn')
const isGenBtnActive = computed(() => activeEl.value?.id === 'generate-btn')

whenever(g, () => {
  if (isBodyActive.value || isCopyBtnActive.value || isGenBtnActive.value) {
    setNewPassphrase()
  }
})
whenever(c, () => {
  if (isBodyActive.value || isCopyBtnActive.value || isGenBtnActive.value) {
    selectAndCopyPassphrase()
  }
})
</script>

<template>
  <div>
    <div class="w-fullmt-[10vh]">
      <h2 class="text-2xl md:text-4xl font-mono leading-snug text-center text-balance mb-6 md:mb-12 max-w-4xl mx-auto ">
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

      <div class="mt-4 grid md:grid-cols-4 gap-x-4 gap-y-5 items-end max-w-2xl mx-auto ">
        <div class="col-span-2 flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <Label class="text-sm">Words</Label>
            <Label class="text-sm">{{ wordCount }}</Label>
          </div>

          <Slider
            v-model="wordCountModel"
            :max="15"
            :min="1"
            :step="1"
          />
        </div>

        <BaseTooltip :delay="1000">
          <Button id="copy-btn" variant="outline" size="default" @click="selectAndCopyPassphrase">
            Copy
          </Button>
          <template #content>
            <p>
              Press <Kbd>C</Kbd> to copy
            </p>
          </template>
        </BaseTooltip>

        <BaseTooltip :delay="1000">
          <Button id="generate-btn" variant="default" size="default" @click="setNewPassphrase">
            Generate new
          </Button>
          <template #content>
            <p>
              Press <Kbd>G</Kbd> to generate
            </p>
          </template>
        </BaseTooltip>

        <!-- TODO: shift when custom selected, with cookie on first load -->
        <div class="col-span-2 flex items-end gap-2">
          <div class="flex flex-col gap-1.5 grow">
            <Label>Separator</Label>
            <Select v-model="separator">
              <SelectTrigger class="text-left">
                <SelectValue placeholder="Separator">
                  <!-- <div v-if="selectedSeparator">
                    <span class="w-full">{{ selectedSeparator.label }}</span>
                    <span
                      v-if="isSpecialSeparatorSelected"
                      class="text-muted-foreground ml-1 font-mono"
                    >({{ selectedSeparator?.symbol }})</span>
                  </div> -->
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup
                  v-for="group in [
                    { label: 'Spacing', values: spaceSeparators },
                    { label: 'Special', values: modeSeparators },
                    { label: 'Symbols', values: symbolSeparators }
                  ]"
                  :key="group.label"
                >
                  <SelectLabel>{{ group.label }}</SelectLabel>
                  <SelectItem
                    v-for="item in group.values"
                    :key="item.value"
                    class="text-left"
                    :value="item.value"
                  >
                    <span class="w-full">{{ item.label }}</span>
                    <span
                      v-if="!isSpecialOrModeSeparator(item.value)"
                      class="text-muted-foreground ml-1 font-mono"
                    >({{ item.symbol }})</span>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Input
            v-if="separator === '<CUSTOM>'"
            ref="customSeparatorEl"
            v-model="customSeparator"
            class="w-10 text-md aspect-square text-center shrink-0"
          />
        </div>

        <div class="col-span-2">
          <div class="flex flex-col gap-1.5">
            <!-- TODO: separate by diceware compatible -->
            <!-- separate diff locales? -->
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

        <div class="col-span-2 flex flex-col items-start gap-2">
          <div class="flex items-center">
            <Label>Case</Label>

            <BasePopover
              side="top"
              content-class="text-xs p-2"
            >
              <Icon class="ml-1 text-sm" name="ph:info" />

              <template #content>
                <div>
                  <p>Choose to apply specific case to each word.</p>
                  <p>Case stays preserved when none are selected.</p>

                  <p class="mt-2 mb-0.5">
                    Options:
                  </p>
                  <ul class="list-disc list-inside">
                    <li>
                      <strong>lowercase</strong> - turn all words lowercase
                    </li>
                    <li>
                      <strong>UPPERCASE</strong> - turn all words uppercase
                    </li>
                    <li>
                      <strong>Title Case</strong> - capitalize first letter of each word
                    </li>
                    <li>
                      <strong>mixed CASE</strong> - assigned random case to each word (preserved, lowercase, uppercase or title case)
                    </li>
                  </ul>
                </div>
              </template>
            </BasePopover>
          </div>
          <ToggleGroup v-model="casing" class="mx-0" type="single">
            <BaseTooltip content="lowercase">
              <ToggleGroupItem value="lowercase" aria-label="Toggle lowercase" :variant="casing === 'lowercase' ? 'primary' : 'outline'">
                <Icon name="radix-icons:letter-case-lowercase" class="text-[1.25em]" />
              </ToggleGroupItem>
            </BaseTooltip>
            <BaseTooltip content="UPPERCASE">
              <ToggleGroupItem value="uppercase" aria-label="Toggle uppercase" :variant="casing === 'uppercase' ? 'primary' : 'outline'">
                <Icon name="radix-icons:letter-case-uppercase" class="text-[1.25em]" />
              </ToggleGroupItem>
            </BaseTooltip>
            <BaseTooltip content="Title Case">
              <ToggleGroupItem value="titlecase" aria-label="Toggle title case" :variant="casing === 'titlecase' ? 'primary' : 'outline'">
                <Icon name="radix-icons:letter-case-capitalize" class="text-[1.25em]" />
              </ToggleGroupItem>
            </BaseTooltip>
            <BaseTooltip content="Mixed case">
              <ToggleGroupItem value="mixed" aria-label="Toggle mixed case" :variant="casing === 'mixed' ? 'primary' : 'outline'">
                <Icon name="radix-icons:letter-case-toggle" class="text-[1.25em]" />
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

        <Label v-if="isDefined(calculatedEntropy)">Entropy: {{ calculatedEntropy }} bit</Label>
      </div>
    </div>
  </div>
</template>
