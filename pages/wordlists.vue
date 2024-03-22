<script lang="ts" setup>
// TODO: make it a map
const lists = ref([
  {
    id: 'eff-large',
    name: 'eff large wordlist',
    description: 'Flagship wordlist with 7776 words, 12.9 bits of entropy per word',
  },
  {
    id: 'eff-short',
    name: 'eff short wordlist',
    description: 'Short wordlist with 1296 words, 10.3 bits of entropy per word',
  },
  {
    id: 'eff-dice',
    name: 'eff dice wordlist',
    description: 'Dice wordlist with 7776 words, 12.9 bits of entropy per word',
  },
  {
    id: 'orhcard-short',
    name: 'orhcard short wordlist',
    description: 'Short wordlist with 2048 words, 11 bits of entropy per word',
  },
  {
    id: 'orhcard-long',
    name: 'orhcard long wordlist',
    description: 'Long wordlist with 4096 words, 12 bits of entropy per word',
  },
  {
    id: 'orhcard-dice',
    name: 'orhcard dice wordlist',
    description: 'Dice wordlist with 4096 words, 12 bits of entropy per word',
  },
  {
    id: 'bip39',
    name: 'bip39 wordlist',
    description: 'Wordlist used in BIP39 mnemonic phrases',
  },
  {
    id: 'diceware',
    name: 'diceware wordlist',
    description: 'Wordlist used in diceware passphrases',
  },
  {
    id: 'eff-german',
    name: 'eff german wordlist',
    description: 'German wordlist with 2048 words, 11 bits of entropy per word',
  },
  {
    id: 'eff-spanish',
    name: 'eff spanish wordlist',
    description: 'Spanish wordlist with 2048 words, 11 bits of entropy per word',
  },
  {
    id: 'eff-french',
    name: 'eff french wordlist',
    description: 'French wordlist with 2048 words, 11 bits of entropy per word',
  },
  {
    id: 'eff-italian',
    name: 'eff italian wordlist',
    description: 'Italian wordlist with 2048 words, 11 bits of entropy per word',
  },
  {
    id: 'eff-japanese',
    name: 'eff japanese wordlist',
    description: 'Japanese wordlist with 2048 words, 11 bits of entropy per word',
  },
  {
    id: 'eff-korean',
    name: 'eff korean wordlist',
    description: 'Korean wordlist with 2048 words, 11 bits of entropy per word',
  },
  {
    id: 'eff-portuguese',
    name: 'eff portuguese wordlist',
    description: 'Portuguese wordlist with 2048 words, 11 bits of entropy per word',
  },
  {
    id: 'eff-russian',
    name: 'eff russian wordlist',
    description: 'Russian wordlist with 2048 words, 11 bits of entropy per word',
  },
])

const addedWordlists = useCookie<string[]>('selection-wordlists', { default: () => [] })

const addWordlist = (wordlist: string) => {
  addedWordlists.value.push(wordlist)
}

const removeWordlist = (wordlist: string) => {
  addedWordlists.value = addedWordlists.value.filter((id) => id !== wordlist)
}

const isAdded = (id: string) => {
  return addedWordlists.value.includes(id)
}

type Wordlist = typeof lists.value[0]
const open = ref(false)
const openedWordlist = ref<Wordlist | undefined>(undefined)

const openWordlistDetails = (wordlist: Wordlist) => {
  openedWordlist.value = wordlist
  open.value = true
}

watch(open, (val) => {
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
        <Dialog v-model:open="open">
          <DialogContent class="min-h-[400px] w-screen">
            <DialogHeader>
              <DialogTitle>{{ openedWordlist?.name }}</DialogTitle>
              <DialogDescription>
                {{ openedWordlist?.description }}
              </DialogDescription>
            </DialogHeader>

            <DialogFooter class="mt-auto">
              <Button
                variant="destructive"
                @click.stop="removeWordlist(openedWordlist!.id)"
              >
                Remove
              </Button>

              <Button
                variant="default"
                @click.stop="addWordlist(openedWordlist!.id)"
              >
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
    <div class="grid-wordlists grid gap-4">
      <template v-for="list in lists" :key="list.id">
        <button class="group" @click="openWordlistDetails(list)">
          <Card class="overflow-hidden border hover:border-ring">
            <CardHeader class="text-left">
              <CardTitle>
                {{ list.name }}
              </CardTitle>
              <CardDescription class="line-clamp-2">
                {{ list.description }}
              </CardDescription>
            </CardHeader>

            <CardContent class="grow h-56">
              <div class="flex flex-col h-full">
                <div class="flex justify-items-end gap-2 mt-auto ml-auto">
                  <ClientOnly>
                    <BaseTooltip content="Download">
                      <Button variant="outline" size="icon">
                        <Icon name="ph:download-bold" class="text-[1.15em]" @click.stop="" />
                      </Button>
                    </BaseTooltip>

                    <BaseTooltip v-if="isAdded(list.id)" content="Remove from selection">
                      <Button
                        variant="destructive"
                        size="icon"
                        @click.stop="removeWordlist(list.id)"
                      >
                        <Icon name="ph:minus-bold" class="text-[1.15em]" />
                      </Button>
                    </BaseTooltip>

                    <BaseTooltip v-else content="Add to selection">
                      <Button
                        variant="secondary"
                        size="icon"
                        @click.stop="addWordlist(list.id)"
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
