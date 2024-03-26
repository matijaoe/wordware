<template>
  <Html lang="en">
    <Body>
      <NuxtLayout class="min-h-screen">
        <NuxtPage />

        <Toaster />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<style lang="postcss" scoped>
:global(:root) {
  color-scheme: dark;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
