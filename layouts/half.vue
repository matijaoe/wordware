<template>
  <div class="grid grid-cols-2">
    <div class="p-8 pr-0">
      <Header />

      <main class="mt-8">
        <slot />
      </main>
    </div>
    <slot name="right" />
  </div>
</template>
