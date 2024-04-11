<template>
  <div class="grid xl:grid-cols-2 overflow-auto gap-4 h-screen">
    <div class="p-4 sm:py-5 sm:px-8 pr-0 overflow-y-auto">
      <Header class="mb-4" />

      <main>
        <slot />
      </main>
    </div>

    <slot name="right" />
  </div>
</template>
