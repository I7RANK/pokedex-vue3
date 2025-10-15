<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
</script>

<template>
  <div class="max-w-layout mx-auto mt-12.5 flex w-full flex-col items-center">
    <h1 class="text-4xl leading-[2.6875rem]">Uh-oh!</h1>
    <p class="text-neutral mt-2.5 text-xl leading-7.5">You look lost on your journey!</p>
    <RouterLink to="/">
      <BaseButton class="mt-[25px]" variant="primary">Go back home</BaseButton>
    </RouterLink>
  </div>
</template>
