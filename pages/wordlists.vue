<script lang="ts" setup>
import { wordlistMap } from '~/constants/wordlists'
import type { WordlistId } from '~/models/wordlist'

const { selectedLists, isWordlistSelected, addWordlist, removeWordlist } = useWordlistSelection()

const isModalOpen = ref(false)
const openedWordlist = ref<WordlistId>()
const openedWordlistDetails = computed(() => {
  if (!openedWordlist.value) {
    return undefined
  }
  return wordlistMap.get(openedWordlist.value)
})

const openWordlistDetails = (wordlistId: WordlistId) => {
  openedWordlist.value = wordlistId
  isModalOpen.value = true
}

watch(isModalOpen, (val) => {
  if (!val) {
    openedWordlist.value = undefined
  }
})
</script>

<template>
  <div class="grid grid-cols-[300px_1fr] gap-4 mt-4">
    <div>
      <div class="sticky top-8">
        <h1 class="font-bold text-3xl">
          Wordlists
        </h1>
        {{ selectedLists }}
        <Dialog v-model:open="isModalOpen">
          <DialogContent class="max-h-[400px] w-screen">
            <DialogHeader>
              <DialogTitle>{{ openedWordlistDetails?.name }}</DialogTitle>
              <DialogDescription>
                <!-- TODO: dummy -->
                Dice wordlist with 7776 words, 12.9 bits of entropy per word
              </DialogDescription>
            </DialogHeader>

            <DialogFooter v-if="openedWordlist" class="mt-auto !justify-between">
              <Button variant="outline" class="flex items-center gap-2">
                <Icon name="ph:download-bold" class="text-[1.15em]" @click.stop="" />
                Download
              </Button>

              <div>
                <Button
                  v-if="isWordlistSelected(openedWordlist)"
                  variant="destructive"
                  @click.stop="removeWordlist(openedWordlist)"
                >
                  Remove from selection
                </Button>

                <Button
                  v-else
                  variant="default"
                  @click.stop="addWordlist(openedWordlist)"
                >
                  Add to selection
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
    <div class="grid-wordlists grid gap-4">
      <template v-for="[wordlistId, value] in wordlistMap" :key="wordlistId">
        <button class="group" @click="openWordlistDetails(wordlistId)">
          <Card class="overflow-hidden group-hover:bg-secondary/10 aspect-square flex flex-col">
            <CardHeader class="text-left">
              <CardTitle class="line-clamp-2">
                {{ value.name }}
              </CardTitle>
              <CardDescription class="line-clamp-2">
                <!-- TODO: dummy -->
                Dice wordlist with 7776 words, 12.9 bits of entropy per word
              </CardDescription>
            </CardHeader>

            <CardContent class="grow">
              <div class="flex flex-col h-full mt-auto">
                <div class="flex justify-items-end gap-2 mt-auto ml-auto">
                  <ClientOnly>
                    <BaseTooltip v-if="isWordlistSelected(wordlistId)" content="Remove from selection">
                      <Button
                        variant="destructive"
                        size="icon"
                        @click.stop="removeWordlist(wordlistId)"
                      >
                        <Icon name="ph:minus-bold" class="text-[1.15em]" />
                      </Button>
                    </BaseTooltip>

                    <BaseTooltip v-else content="Add to selection">
                      <Button
                        variant="secondary"
                        size="icon"
                        @click.stop="addWordlist(wordlistId)"
                      >
                        <Icon name="ph:plus-bold" class="text-[1.15em]" />
                      </Button>
                    </BaseTooltip>
                  </ClientOnly>
                </div>
              </div>
            </CardContent>
          </Card>
        </button>
      </template>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.grid-wordlists {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
</style>
