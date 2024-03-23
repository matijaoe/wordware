<script lang="ts" setup>
import type { WordlistId } from '~/models/wordlist'

const props = defineProps<{
  wordlistId: WordlistId
}>()

const { addWordlist, removeWordlist } = useWordlistSelection()

const { wordlist, constructedDescription, isWordlistSelected } = useWordlist(() => props.wordlistId)
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
            <ClientOnly>
              <BaseTooltip v-if="isWordlistSelected" content="Remove from selection">
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
    </template>
  </Card>
</template>
