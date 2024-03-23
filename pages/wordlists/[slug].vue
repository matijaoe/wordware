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
