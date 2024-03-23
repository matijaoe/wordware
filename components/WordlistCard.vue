<script lang="ts" setup>
import type { WordlistSlug } from '~/models/wordlist'

const props = defineProps<{
  wordlistSlug: WordlistSlug
}>()

const { addWordlist, removeWordlist } = useWordlistSelection()

const { wordlist, constructedDescription, isWordlistSelected } = useWordlist(() => props.wordlistSlug)
</script>

<template>
  <Card class="overflow-hidden group-hover:bg-secondary/10 aspect-square flex flex-col">
    <template v-if="wordlist">
      <CardHeader class="text-left">
        <CardTitle class="line-clamp-2">
          {{ wordlist.name }}
        </CardTitle>
        <CardDescription class="line-clamp-3">
          {{ constructedDescription }}
        </CardDescription>
      </CardHeader>

      <CardContent class="grow text-left">
        <div class="flex flex-col h-full mt-auto">
          <div class="flex justify-items-end gap-2 mt-auto ml-auto">
            <NuxtLink
              :to="{
                name: 'wordlists-slug',
                params: { slug: wordlistSlug }
              }"
            >
              <Button as="div" variant="ghost" size="icon" class="flex items-center gap-2">
                <Icon name="ph:arrow-up-right" class="text-[1.15em]" @click.stop="" />
              </Button>
            </NuxtLink>

            <ClientOnly>
              <BaseTooltip v-if="isWordlistSelected" content="Remove from selection">
                <Button
                  variant="destructive"
                  size="icon"
                  @click.stop="removeWordlist(wordlistSlug)"
                >
                  <Icon name="ph:minus-bold" class="text-[1.15em]" />
                </Button>
              </BaseTooltip>

              <BaseTooltip v-else content="Add to selection">
                <Button
                  variant="secondary"
                  size="icon"
                  @click.stop="addWordlist(wordlistSlug)"
                >
                  <Icon name="ph:plus-bold" class="text-[1.15em]" />
                </Button>
              </BaseTooltip>
            </ClientOnly>
          </div>
        </div>
      </CardContent>
    </template>
  </Card>
</template>
