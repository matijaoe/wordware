<script lang="ts" setup>
import type { PopoverContentProps } from 'radix-vue'
import { cn } from '@/lib/utils'

defineProps<{
  content?: string
  contentClass?: string
  side?: PopoverContentProps['side']
}>()
</script>

<template>
  <Popover>
    <PopoverTrigger as-child class="flex items-center justify-center">
      <slot />
    </PopoverTrigger>

    <PopoverContent :side :class="[cn(contentClass)]">
      <slot name="content">
        {{ content }}
      </slot>
    </PopoverContent>
  </Popover>
</template>
