<script setup lang="ts">
import FavoriteButton from './FavoriteButton.vue'

defineProps<{
  name: string
  isFavorite: boolean
}>()

const emit = defineEmits(['click-favorites', 'click-card'])
</script>

<template>
  <div
    class="flex w-full cursor-pointer items-center justify-between rounded-[5px] bg-white py-2 pr-2.5 pl-5 transition-all hover:drop-shadow-md"
    @click="emit('click-card')"
  >
    <p class="text-[22px] capitalize">{{ name }}</p>
    <FavoriteButton :is-favorite="isFavorite" @click-favorites="emit('click-favorites')" />
  </div>
</template>
