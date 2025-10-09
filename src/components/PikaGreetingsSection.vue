<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
</script>

<template>
  <div class="max-w-layout relative mt-8.75 flex flex-col items-center">
    <img
      class="z-10 h-[288px] w-[325px]"
      src="https://res.cloudinary.com/dnmjkesyn/image/upload/q_auto:best/v1749764680/9114966f-19d1-4062-9c7a-f774007b2594.png"
      alt="Pikachu waving"
    />
    <div class="mt-15 flex flex-col items-center">
      <h1 class="text-h1 text-dark text-center leading-[1.9375rem] font-bold">
        Welcome to Pokédex
      </h1>
      <p class="text-neutral mt-7.5 text-center text-lg">
        The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the
        Pokémon world.
      </p>

      <RouterLink to="/pokemon">
        <BaseButton class="mt-12.5" variant="primary">Get started</BaseButton>
      </RouterLink>
    </div>
  </div>
</template>
