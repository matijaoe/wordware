<script lang="ts" setup>
definePageMeta({
  layout: false,
})

const route = useRoute('wordlists-slug')

const { wordlist, constructedDescription, words } = useWordlist(() => route.params.slug)

// TODO: add tooltips to each stat
// https://github.com/sts10/wla/tree/main
</script>

<template>
  <NuxtLayout name="half">
    <div v-if="wordlist">
      <div>
        <div class="flex items-center gap-5 mb-3">
          <h1 class="text-4xl">
            {{ wordlist.name }}
          </h1>

          <div v-if="wordlist.diceware" class="flex items-center gap-2">
            <Badge>
              Diceware
            </Badge>

            <Badge v-if="wordlist.diceware.rollsPerWord === 3" class="flex items-center gap-1">
              3 dice <Icon name="ph:dice-three-bold" class="text-lg" />
            </Badge>
            <Badge v-else-if="wordlist.diceware.rollsPerWord === 4" class="flex items-center gap-1">
              4 dice <Icon name="ph:dice-four-bold" class="text-lg" />
            </Badge>
            <Badge v-else-if="wordlist.diceware.rollsPerWord === 5" class="flex items-center gap-1">
              5 dice <Icon name="ph:dice-five-bold" class="text-lg" />
            </Badge>
          </div>
        </div>

        <p class="text-muted-foreground">
          {{ constructedDescription }}
        </p>

        <!-- TODO: add info popup to each -->
        <div class="mt-6 grid grid-cols-[300px_1fr] gap-x-2 gap-y-2">
          <InfoItem
            :wrapper="false"
            label="List length"
          >
            <template #label="{ label }">
              <p>{{ label }}</p>
              <!-- <Icon name="ph:info" class="text-sm" /> -->
            </template>

            {{ wordlist.stats.words.toLocaleString() }} words
          </InfoItem>

          <InfoItem
            :wrapper="false"
            label="Mean word length"
          >
            {{ wordlist.stats.meanWordLength.toFixed(2) }} characters
          </InfoItem>

          <InfoItem
            :wrapper="false"
            label="Entropy per word"
          >
            <span>{{ wordlist.stats.entropyPerWord }} bits</span>
          </InfoItem>

          <InfoItem
            :wrapper="false"
            label="Efficiency per character"
          >
            <span>{{ wordlist.stats.efficiencyPerCharacter }} bits</span>
          </InfoItem>

          <InfoItem
            v-if=" wordlist.stats.canBeShortened"
            :wrapper="false"
            label="Assumed entropy per character"
          >
            {{ wordlist.stats.assumedEntropyPerCharacter }} bits
          </InfoItem>

          <InfoItem
            :wrapper="false"
            label="Shortest word"
          >
            <span>{{ wordlist.stats.shortestWordLength }} characters</span>
            <span class="text-muted-foreground"> ({{ wordlist.stats.shortestWordExample }})</span>
          </InfoItem>

          <InfoItem
            :wrapper="false"
            label="Longest word"
          >
            <span>{{ wordlist.stats.longestWordLength }} characters</span>
            <span class="text-muted-foreground"> ({{ wordlist.stats.longestWordExample }})</span>
          </InfoItem>

          <InfoItem
            :wrapper="false"
            label="Longest shared prefix"
          >
            {{ wordlist.stats.longestSharedPrefix }} characters
          </InfoItem>

          <!-- TODO: show canBeShortened? -->
          <InfoItem
            :wrapper="false"
            label="Unique character prefix"
          >
            {{ wordlist.stats.uniqueCharacterPrefix }} characters
          </InfoItem>

          <InfoItem
            :wrapper="false"
            label="Free of exact duplicates"
          >
            {{ !wordlist.stats.hasDuplicatesExact }}
          </InfoItem>

          <InfoItem
            :wrapper="false"
            label="Free of fuzzy duplicates"
          >
            {{ !wordlist.stats.hasDuplicatesFuzzy }}
          </InfoItem>

          <InfoItem
            :wrapper="false"
            label="Unique words (exact)"
          >
            {{ wordlist.stats.uniqueWordsFoundExact.toLocaleString() }}
          </InfoItem>

          <InfoItem
            :wrapper="false"
            label="Unique words (fuzzy)"
          >
            {{ wordlist.stats.uniqueWordsFoundFuzzy.toLocaleString() }}
          </InfoItem>

          <InfoItem
            :wrapper="false"
            label="Unique characters (exact)"
          >
            {{ wordlist.stats.uniqueCharactersExact.toLocaleString() }}
          </InfoItem>

          <InfoItem
            :wrapper="false"
            label="Unique characters (fuzzy)"
          >
            {{ wordlist.stats.uniqueCharactersFuzzy.toLocaleString() }}
          </InfoItem>

          <InfoItem
            :wrapper="false"
            label="Free of non-ASCII characters"
          >
            {{ wordlist.stats.hasNonAsciiCharacters }}
          </InfoItem>

          <InfoItem
            :wrapper="false"
            label="Consistent case"
          >
            {{ wordlist.stats.hasConsistentCase }}
          </InfoItem>

          <InfoItem
            :wrapper="false"
            label="All lowercase"
          >
            {{ wordlist.stats.isAllLowercase }}
          </InfoItem>

          <InfoItem
            :wrapper="false"
            label="Has numbers"
          >
            {{ wordlist.stats.hasNumbers }}
          </InfoItem>

          <InfoItem
            :wrapper="false"
            label="Free of prefix words"
          >
            {{ wordlist.stats.freeOfPrefixWords }}
          </InfoItem>

          <InfoItem
            :wrapper="false"
            label="Free of suffix words"
          >
            {{ wordlist.stats.freeOfSuffixWords }}
          </InfoItem>

          <InfoItem
            :wrapper="false"
            label="Above brute-force line"
          >
            {{ wordlist.stats.isAboveBruteForceLine }}
          </InfoItem>
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
