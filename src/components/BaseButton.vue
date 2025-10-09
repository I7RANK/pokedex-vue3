<script setup lang="ts">
import { useAttrs, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary'
  }>(),
  {
    variant: 'primary',
  },
)

const attrs = useAttrs()

const variantClasses = computed(() => {
  if (attrs.disabled) return 'bg-secondary !cursor-default'
  return props.variant === 'primary'
    ? 'bg-primary active:bg-primary-pressed hover:opacity-90'
    : 'bg-secondary active:bg-secondary-pressed hover:opacity-90'
})
</script>

<template>
  <button
    class="text-h2 flex h-11 cursor-pointer items-center rounded-full px-5 py-[0.6875rem] text-white transition-all"
    :class="variantClasses"
  >
    <slot />
  </button>
</template>
