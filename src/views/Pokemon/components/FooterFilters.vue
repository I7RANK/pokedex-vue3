<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import { FILTER_UI_CONFIG } from '@/constants/filters'
import type { FooterFilterOptions } from '@/types/filters.type'

const props = defineProps<{
  initialSelectedFilter: FooterFilterOptions
}>()

const emit = defineEmits(['onFilterChange'])

const activeButton = ref<FooterFilterOptions>(props.initialSelectedFilter)

const handleClick = (buttonName: FooterFilterOptions) => {
  activeButton.value = buttonName
  emit('onFilterChange', buttonName)
}
</script>

<template>
  <div
    class="footer-filters-container fixed bottom-0 left-0 flex w-full justify-center gap-x-[0.9375rem] bg-white px-7.5 py-4.5 lg:gap-x-5 lg:px-0"
  >
    <BaseButton
      v-for="filter in FILTER_UI_CONFIG"
      :key="filter.key"
      class="flex h-11 w-full max-w-[17.1875rem] items-center justify-center gap-x-2.5 !py-2.5"
      :variant="activeButton === filter.key ? 'primary' : 'secondary'"
      @click="handleClick(filter.key)"
    >
      <img :src="filter.icon" class="h-5.5 w-5.5" />
      <span>{{ filter.label }}</span>
    </BaseButton>
  </div>
</template>

<style scoped>
.footer-filters-container {
  box-shadow: 0px -5px 4px 0px #0000000d;
}
</style>
