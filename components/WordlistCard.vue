<script lang="ts" setup>
import type { WordlistSlug } from '~/models/wordlist'

const props = defineProps<{
  wordlistSlug: WordlistSlug
}>()

const { addWordlist, removeWordlist, checkIfWordlistSelected } = useWordlistSelection()

const { wordlist, constructedDescription } = useWordlist(() => props.wordlistSlug)

const onGoToWordlist = () => {
  navigateTo({
    name: 'wordlists-slug',
    params: { slug: props.wordlistSlug },
  })
}
</script>

<template>
  <Card class="overflow-hidden hover:bg-secondary/10 aspect-[12/13] flex flex-col">
    <template v-if="wordlist">
      <CardHeader class="text-left">
        <CardTitle class="line-clamp-2">
          {{ wordlist.name }}
        </CardTitle>
        <CardDescription>
          {{ constructedDescription }}
        </CardDescription>
      </CardHeader>

      <CardContent class="grow text-left">
        <div class="flex flex-col h-full mt-auto">
          <div class="flex justify-items-end gap-2 mt-auto ml-auto">
            <Button
              variant="outline"
              size="icon"
              @click.stop="onGoToWordlist()"
            >
              <Icon name="ph:arrow-up-right" class="text-[1.15em]" />
            </Button>

            <!-- TODO: not working after first remove -->
            <BaseTooltip v-if="checkIfWordlistSelected(wordlistSlug)" content="Remove from selection">
              <Button
                variant="destructive"
                size="icon"
                @click.stop="removeWordlist(wordlistSlug)"
              >
                <Icon name="ph:minus" class="text-[1.15em]" />
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
          </div>
        </div>
      </CardContent>
    </template>
  </Card>
</template>
