<script setup lang="ts">
import { ref, watch } from 'vue'
import IconSearch from '@/assets/icons/search.svg'

const emit = defineEmits(['update:modelValue'])

const props = defineProps<{
  modelValue: string
}>()

const inputValue = ref(props.modelValue)
const timeout = ref<number | null>(null)

watch(inputValue, (newValue) => {
  if (timeout.value) clearTimeout(timeout.value)
  timeout.value = setTimeout(() => {
    emit('update:modelValue', newValue.trim())
  }, 400)
})
</script>

<template>
  <div class="search-input-container max-w-layout relative h-12.5 w-full rounded-[5px] bg-white">
    <img
      :src="IconSearch"
      class="pointer-events-none absolute top-1/2 left-[15px] h-4.5 w-4.5 -translate-y-1/2"
    />
    <input
      type="text"
      v-model="inputValue"
      placeholder="Search"
      class="outline-primary h-full w-full py-2 pr-4 pl-[43px]"
    />
  </div>
</template>

<style scoped>
.search-input-container {
  box-shadow: 0px 2px 10px 0px #0000000a;
}
</style>
