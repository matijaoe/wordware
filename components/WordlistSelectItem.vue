<script lang="ts" setup>
import type { WordlistSlug } from '~/models/wordlist'

const props = defineProps<{
  value: WordlistSlug
}>()

const { wordlist } = useWordlist(() => props.value)
</script>

<template>
  <SelectItem :value="value">
    <div v-if="wordlist">
      <p class="w-">
        {{ wordlist.name }}
      </p>
      <span class="text-[13px] text-muted-foreground font-mono">{{ wordlist.stats.words.toLocaleString() }} words, {{ wordlist.stats.entropyPerWord }} bit per word</span>
    </div>
    <template v-else>
      {{ value }}
    </template>
  </SelectItem>
</template>
