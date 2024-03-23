<script lang="ts" setup>
import type { WordlistSlug } from '~/models/wordlist'

const props = defineProps<{
  wordlistSlug?: WordlistSlug
}>()

const isModalOpen = defineModel<boolean>('open', { default: false })

const { addWordlist, removeWordlist } = useWordlistSelection()

const { wordlist, constructedDescription, isWordlistSelected } = useWordlist(() => props.wordlistSlug)
</script>

<template>
  <Dialog v-model:open="isModalOpen">
    <DialogContent class="max-h-[400px] w-screen">
      <template v-if="wordlist && wordlistSlug">
        <DialogHeader v-if="wordlist">
          <DialogTitle>{{ wordlist.name }}</DialogTitle>
          <DialogDescription>
            {{ constructedDescription }}
          </DialogDescription>
        </DialogHeader>

        <div class="pb-2">
          <p class="mb-1">
            Word sample
          </p>
          <p class="text-muted-foreground text-sm font-mono">
            {{ wordlist?.sample.join(' ') }}
          </p>
        </div>

        <DialogFooter v-if="wordlist" class="mt-auto !justify-between">
          <div class="flex items-center gap-2">
            <NuxtLink>
              <Button variant="outline" size="icon" class="flex items-center gap-2">
                <Icon name="ph:download-bold" class="text-[1.15em]" @click.stop="" />
              </Button>
            </NuxtLink>
            <NuxtLink external :to="`/wordlists/${wordlistSlug}`">
              <Button as="div" variant="outline" size="icon" class="flex items-center gap-2">
                <Icon name="ph:download-bold" class="text-[1.15em]" @click.stop="" />
              </Button>
            </NuxtLink>

            <NuxtLink
              :to="{
                name: 'wordlists-slug',
                params: { slug: wordlistSlug }
              }"
              :external="false"
            >
              <Button as="div" variant="outline" size="icon" class="flex items-center gap-2">
                <Icon name="ph:arrow-up-right" class="text-[1.15em]" @click.stop="" />
              </Button>
            </NuxtLink>
          </div>

          <div>
            <Button
              v-if="isWordlistSelected"
              variant="destructive"
              @click.stop="removeWordlist(wordlistSlug)"
            >
              Remove from selection
            </Button>

            <Button
              v-else
              variant="default"
              @click.stop="addWordlist(wordlistSlug)"
            >
              Add to selection
            </Button>
          </div>
        </DialogFooter>
      </template>
    </DialogContent>
  </Dialog>
</template>
