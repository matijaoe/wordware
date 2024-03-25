<script lang="ts" setup>
import { WordlistMap } from '~/constants/generated/wordlist-map'
import type { WordlistSlug } from '~/models/wordlist'

const _isModalOpen = ref(false)
const selectedList = ref<WordlistSlug>()

const isModalOpen = computed({
  get: () => _isModalOpen.value && !!selectedList.value,
  set: (value: boolean) => {
    _isModalOpen.value = value
  },
})

const openListModal = (wordlistSlug: WordlistSlug) => {
  selectedList.value = wordlistSlug
  isModalOpen.value = true
}

watch(isModalOpen, (open) => {
  if (!open) {
    // TODO: do I have to wait for animation to finish?
    setTimeout(() => {
      selectedList.value = undefined
    }, 200)
  }
})

// TODO: implement order prop, and sort by order everywhere
// TODO: perhaps make it so you can change the order by drag and drop (may be too complicated though)
</script>

<template>
  <div class="grid lg:grid-cols-[300px_1fr] gap-4 mt-4">
    <div>
      <div class="sticky top-8">
        <h1 class="text-2xl md:text-4xl">
          Wordlists
        </h1>

        <WordlistModal
          v-model:open="isModalOpen"
          :wordlist-slug="selectedList"
        />
      </div>
    </div>
    <div class="grid-wordlists grid gap-4">
      <template v-for="[wordlistSlug] in WordlistMap" :key="wordlistSlug">
        <WordlistCard
          :wordlist-slug
          @click="openListModal(wordlistSlug)"
        />
      </template>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.grid-wordlists {
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
}
</style>
