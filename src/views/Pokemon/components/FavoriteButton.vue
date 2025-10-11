<script setup lang="ts">
import IconStarEnabled from '@/assets/icons/star-enabled.svg'
import IconStarDisabled from '@/assets/icons/star-disabled.svg'

defineProps<{
  isFavorite: boolean
}>()

const emit = defineEmits(['click-favorites'])
</script>

<template>
  <button class="relative h-11 w-11 cursor-pointer" @click.stop="emit('click-favorites')">
    <img
      :src="IconStarEnabled"
      class="absolute top-0 h-full w-full hover:opacity-90"
      :class="isFavorite ? '' : 'pointer-events-none opacity-0'"
    />
    <img
      :src="IconStarDisabled"
      class="absolute top-0 h-full w-full hover:opacity-90"
      :class="isFavorite ? 'pointer-events-none opacity-0' : ''"
    />
  </button>
</template>
