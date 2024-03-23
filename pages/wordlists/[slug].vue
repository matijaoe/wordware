<script lang="ts" setup>
const route = useRoute('wordlists-slug')

const { wordlist, constructedDescription } = useWordlist(() => route.params.slug)
</script>

<template>
  <div v-if="wordlist">
    <div class="grid grid-cols-2">
      <div>
        <h1 class="text-4xl mb-3">
          {{ wordlist.name }}
        </h1>

        <p class="text-muted-foreground">
          {{ constructedDescription }}
        </p>
      </div>
      <div>
        file
      </div>
    </div>
  </div>
</template>
