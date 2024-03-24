<template>
  <div class="grid grid-cols-2 gap-8">
    <div class="p-8 pr-0">
      <Header />

      <main class="mt-6">
        <slot />
      </main>
    </div>
    <slot name="right" />
  </div>
</template>
