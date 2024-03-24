<script lang="ts" setup>
definePageMeta({
  layout: false,
})

const route = useRoute('wordlists-slug')

const { wordlist, constructedDescription, words } = useWordlist(() => route.params.slug)
</script>

<template>
  <NuxtLayout name="half">
    <div v-if="wordlist">
      <div>
        <h1 class="text-4xl mb-3">
          {{ wordlist.name }}
        </h1>

        <p class="text-muted-foreground">
          {{ constructedDescription }}
        </p>

        <div class="mt-6 space-y-1">
          <p class="flex gap-2">
            <span class="text-muted-foreground">List length:</span>{{ wordlist.stats.words.toLocaleString() }} words
          </p>
          <p class="flex gap-2">
            <!-- TODO: format number instead of toFixed -->
            <span class="text-muted-foreground">Mean word length:</span>{{ wordlist.stats.meanWordLength.toFixed(2) }} characters
          </p>
          <p class="flex gap-2">
            <span class="text-muted-foreground">Entropy per word:</span>{{ wordlist.stats.entropyPerWord }} bits
          </p>
          <p class="flex gap-2">
            <span class="text-muted-foreground">Entropy per character (mean):</span>{{ wordlist.stats.entropyPerCharacter }} bits
          </p>
          <p class="flex gap-2">
            <span class="text-muted-foreground">Entropy per character (unique prefix):</span>{{ wordlist.stats.entropyPerUniqueCharacterPrefix }} bits
          </p>
          <p class="flex gap-2">
            <span class="text-muted-foreground">Efficiency per character (mean):</span>{{ wordlist.stats.efficiencyPerCharacter }} bits
          </p>
          <p class="flex gap-2">
            <span class="text-muted-foreground">Shortest word:</span>{{ wordlist.stats.shortestWordLength }} characters<span class="text-muted-foreground">("{{ wordlist.stats.shortestWordExample }}")</span>
          </p>
          <p class="flex gap-2">
            <span class="text-muted-foreground">Longest word:</span>{{ wordlist.stats.longestWordLength }} characters<span class="text-muted-foreground">("{{ wordlist.stats.longestWordExample }}")</span>
          </p>
          <p class="flex gap-2">
            <span class="text-muted-foreground">Longest shared prefix:</span>{{ wordlist.stats.longestSharedPrefix }} characters
          </p>
          <p class="flex gap-2">
            <span class="text-muted-foreground">Unique prefix:</span> {{ wordlist.stats.canBeShortened ? `${wordlist.stats.uniqueCharacterPrefix} characters` : 'no' }}
          </p>
        </div>
      </div>
    </div>

    <template #right>
      <!-- TODO: virtual scroll -->
      <ScrollArea class="h-screen w-full cursor-crosshair select-none" type="hover">
        <div class="h-screen overflow-scroll py-4 pr-2">
          <div class="flex flex-wrap gap-3">
            <span v-for="word in words" :key="word" class="font-mono text-xl leading-none text-muted-foreground/20 hover:text-muted-foreground">
              {{ word }}
            </span>
          </div>
        </div>
      </ScrollArea>
    </template>
  </NuxtLayout>
</template>
