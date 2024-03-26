<template>
  <div class="grid xl:grid-cols-2 overflow-auto gap-4 h-screen">
    <div class="p-4 sm:p-8 pr-0 overflow-y-auto">
      <Header />

      <main class="mt-6">
        <slot />
      </main>
    </div>

    <slot name="right" />
  </div>
</template>
