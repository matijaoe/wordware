<script lang="ts" setup>
withDefaults(defineProps<{
  content?: string
  delay?: number
}>(), {
  delay: 250,
})
</script>

<template>
  <TooltipProvider :delay-duration="delay">
    <Tooltip>
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipContent>
        <slot name="content">
          {{ content }}
        </slot>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
