<script lang="ts" setup>
import { useToast } from '@/components/ui/toast/use-toast'
import type { WordCasingOption } from '~/models'
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

// rename to delimiter?
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

    // still issues sometime when switching to option and inputing first char, it isnt set
    // customSeparator.value ||= DEFAULT_CUSTOM_SEPARATOR

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

const calculatedEntropy = computed(() => {
  // TODO: only taking words into consideration for now
  if (!isDefined(currentWordlist) || !isDefined(passphrase)) {
    return undefined
  }
  const entropyPerWord = currentWordlist.value?.stats.entropyPerWord
  const entropy = entropyPerWord * wordCount.value
  return entropy.toFixed(2)
})

const casing = useCookie<WordCasingOption>('passphrase:casing', { default: () => 'preserve' })

const generatePassphraseUsingConfig = () => {
  const _separator = isSeparatorCustom.value
    ? customSeparator.value
    : selectedSeparator.value?.symbol ?? EMPTY_SPACE

  return generatePassphrase({
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

const copiedShown = refAutoReset(false, 1500)

const setNewPassphrase = () => {
  copiedShown.value = false
  passphrase.value = generatePassphraseUsingConfig()
}

watchEffect(() => {
  setNewPassphrase()
})

const passphraseEl = ref<HTMLDivElement>()

const selectPassphrase = () => {
  if (!isDefined(passphraseEl)) {
    return
  }
  const elem = (passphraseEl.value as any)?.passphraseEl
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
  copiedShown.value = true
}

const bulkGenerate = (amount = 10) => {
  const passphrases = Array.from({ length: amount }, () => generatePassphraseUsingConfig())
  return passphrases
}

const { toast } = useToast()

const onBulkGenerateAndCopy = () => {
  const passphrases = bulkGenerate()
  const text = passphrases.join('\n')
  navigator.clipboard.writeText(text)

  toast({
    title: 'Passphrases copied to clipboard',
    description: 'Bulk generated 10 random passphrases',
    variant: 'default',
    type: 'foreground',
    duration: 1000,
  })
}

const { g, c } = useMagicKeys()

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
    <h2 class="text-2xl md:text-4xl font-mono leading-snug text-center text-balance mb-4 md:mb-10 max-w-4xl mx-auto ">
      Sleek passphrase generator
    </h2>

    <div class="block w-full max-w-4xl mx-auto">
      <div class="flex justify-end mb-3 mr-2">
        <Badge v-if="isDefined(calculatedEntropy)" variant="outline">
          <span class="tabular-nums mr-1">{{ calculatedEntropy }}</span> bits of entropy
        </Badge>
      </div>

      <button class="w-full" @click="selectAndCopyPassphrase">
        <PassphraseBlock
          ref="passphraseEl"
          :passphrase
          :selected-separator="selectedSeparator"
          :hidden="isHidden"
        />
      </button>
    </div>

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

      <TooltipProvider disable-hoverable-content>
        <Tooltip :open="copiedShown">
          <TooltipTrigger as-child>
            <!-- tooltip in tooltip -->
            <BaseTooltip :delay="1000">
              <Button id="copy-btn" variant="outline" size="default" @click="selectAndCopyPassphrase()">
                Copy
              </Button>
              <template #content>
                <p>
                  Press <Kbd>C</Kbd> to copy
                </p>
              </template>
            </BaseTooltip>
          </TooltipTrigger>
          <TooltipContent>
            Copied!
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

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
              <SelectValue placeholder="Separator" />
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

      <div class="col-span-2 flex items-center gap-4">
        <div class="flex flex-col items-start gap-2">
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

          <div class="col-span-2 flex items-center">
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
        </div>

        <div class="flex flex-col items-start gap-2">
          <Label>Extras</Label>

          <div class="flex items-center gap-1">
            <BaseTooltip content="Include number">
              <Toggle
                v-model="includeNumber"
                :variant="includeNumber ? 'primary' : 'outline'"
                aria-label="Include number"
                :disabled="isSeparatorRandomNumbers"
                @click="includeNumber = !includeNumber"
              >
                <Icon name="ph:number-nine" class="text-[1.25em]" />
              </Toggle>
            </BaseTooltip>

            <BaseTooltip :content="isHidden ? 'Show' : 'Hide'">
              <Toggle v-model="isHidden" variant="outline" aria-label="Hide passphrase" @click="isHidden = !isHidden">
                <Icon :name=" isHidden ? 'ph:eye' : 'ph:eye-slash'" class="text-[1.25em]" />
              </Toggle>
            </BaseTooltip>
          </div>
        </div>
      </div>

      <div class="col-span-2">
        <BaseTooltip content="Bulk generate 10 passphrases">
          <Button id="bulk-generate-btn" variant="secondary" class="w-full" size="default" @click="onBulkGenerateAndCopy">
            Bulk generate to clipboard
          </Button>
        </BaseTooltip>
      </div>
    </div>
  </div>
</template>
