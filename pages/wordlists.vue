<script lang="ts" setup>
const lists = ref([
  {
    name: 'eff large wordlist',
    description: 'Flagship wordlist with 7776 words, 12.9 bits of entropy per word',
  },
  {
    name: 'eff short wordlist',
    description: 'Short wordlist with 1296 words, 10.3 bits of entropy per word',
  },
  {
    name: 'eff dice wordlist',
    description: 'Dice wordlist with 7776 words, 12.9 bits of entropy per word',
  },
  {
    name: 'eff short wordlist',
    description: 'Short wordlist with 1296 words, 10.3 bits of entropy per word',
  },
  {
    name: 'eff dice wordlist',
    description: 'Dice wordlist with 7776 words, 12.9 bits of entropy per word',
  },
  {
    name: 'eff short wordlist',
    description: 'Short wordlist with 1296 words, 10.3 bits of entropy per word',
  },
])
</script>

<template>
  <div>
    <h1 class="font-bold text-2xl">
      Wordlists
    </h1>

    <div class="mt-4 grid-wordlists grid gap-4">
      <template v-for="list in lists" :key="list">
        <Card class="h-[340px]">
          <CardHeader>
            <CardTitle>
              {{ list.name }}
            </CardTitle>
            <CardDescription>
              {{ list.description }}
            </CardDescription>
          </CardHeader>
        </Card>
      </template>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.grid-wordlists {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
</style>
