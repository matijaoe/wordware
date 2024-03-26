<script lang="ts" setup>
const route = useRoute()

const activeClass = '!text-foreground'

const isExtendedModule = (moduleName: string) => {
  return route.name?.startsWith(moduleName)
}

const colorMode = useColorMode()
</script>

<template>
  <header class="flex items-center justify-between gap-4">
    <menu class="flex gap-3">
      <div>
        <NuxtLink class="text-muted-foreground" :active-class="activeClass" to="/">
          home
        </NuxtLink>
      </div>
      <div>
        <NuxtLink
          class="text-muted-foreground"
          :class="{ [activeClass]: isExtendedModule('wordlists') }"
          to="/wordlists"
        >
          wordlists
        </NuxtLink>
      </div>
    </menu>

    <div class="flex items-center gap-2">
      <Button
        size="icon"
        variant="link"
        @click="() => {
          colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
        }"
      >
        <Icon name="ph:moon-bold" class="text-[20px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Icon name="ph:sun-bold" class="absolute text-[20px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </div>
  </header>
</template>
