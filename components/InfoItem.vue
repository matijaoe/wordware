<!-- eslint-disable vue/padding-line-between-blocks -->
<script lang="ts" setup>
withDefaults(defineProps<{
  label?: string
  value?: string
  wrapper?: boolean
}>(), {
  wrapper: true,
})

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<template>
  <DefineTemplate>
    <div class="text-muted-foreground flex items-center gap-1.5">
      <slot name="label" :label>
        <p>{{ label }}</p>
      </slot>
    </div>

    <div>
      <slot>
        <p>{{ value }}</p>
      </slot>
    </div>
  </DefineTemplate>

  <div v-if="wrapper">
    <ReuseTemplate />
  </div>
  <template v-else>
    <ReuseTemplate />
  </template>
</template>
