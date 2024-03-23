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
            <BaseTooltip content="Download">
              <NuxtLink download external target="_blank" :to="`/wordlist/${wordlist.localFile}`">
                <Button as="div" variant="outline" size="icon">
                  <Icon name="ph:download" class="text-[1.15em]" @click.stop="" />
                </Button>
              </NuxtLink>
            </BaseTooltip>

            <BaseTooltip content="Local source file">
              <NuxtLink :to="`/wordlist/${wordlist.localFile}`" target="_blank">
                <Button as="div" variant="outline" size="icon">
                  <Icon name="ph:file-text" class="text-[1.15em]" @click.stop="" />
                </Button>
              </NuxtLink>
            </BaseTooltip>

            <BaseTooltip content="Original source file">
              <NuxtLink external target="_blank" :to="wordlist.sourceFile">
                <Button as="div" variant="outline" size="icon">
                  <Icon name="ph:globe" class="text-[1.15em]" @click.stop="" />
                </Button>
              </NuxtLink>
            </BaseTooltip>
          </div>

          <div class="flex items-center gap-2">
            <BaseTooltip v-if="isWordlistSelected" content="Remove from selection">
              <Button
                variant="outline"
                @click.stop="removeWordlist(wordlistSlug)"
              >
                Remove
              </Button>
            </BaseTooltip>

            <BaseTooltip v-else content="Add to selection">
              <Button
                variant="secondary"
                with-icon
                @click.stop="addWordlist(wordlistSlug)"
              >
                Add
                <Icon name="ph:plus-bold" class="text-[1.15em]" />
              </Button>
            </BaseTooltip>
            <NuxtLink
              :to="{
                name: 'wordlists-slug',
                params: { slug: wordlistSlug }
              }"
              :external="false"
            >
              <Button as="div" variant="default" with-icon>
                More
                <Icon name="ph:arrow-up-right" class="text-[1.15em]" @click.stop="" />
              </Button>
            </NuxtLink>
          </div>
        </DialogFooter>
      </template>
    </DialogContent>
  </Dialog>
</template>
