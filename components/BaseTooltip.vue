<script lang="ts" setup>
withDefaults(defineProps<{
  content?: string
  delay?: number
  disableClosingTrigger?: boolean
}>(), {
  delay: 250,
})
</script>

<template>
  <TooltipProvider :delay-duration="delay" :disable-closing-trigger="disableClosingTrigger">
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
