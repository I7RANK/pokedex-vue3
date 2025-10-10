<script setup lang="ts">
import IconPokeBallBottom from '@/assets/icons/pokeball-bottom.svg'
import IconPokeBallTop from '@/assets/icons/pokeball-top.svg'
import IconPokeBallCenter from '@/assets/icons/pokeball-center.svg'
</script>

<template>
  <div class="relative h-[106px] w-[106px]">
    <img :src="IconPokeBallTop" class="pokeball-top absolute top-0 left-0" />
    <img
      :src="IconPokeBallCenter"
      class="pokeball-center absolute top-0 left-0 z-10 h-full w-full"
    />
    <img
      :src="IconPokeBallBottom"
      class="pokeball-bottom absolute top-[-3px] left-0 h-full w-full"
    />
  </div>
</template>

<style scoped>
@keyframes pokeballTopMove {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes pokeballBottomMove {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
}

@keyframes pokeballCenterScale {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.pokeball-top {
  animation: pokeballTopMove 1s ease-in-out infinite;
}

.pokeball-bottom {
  animation: pokeballBottomMove 1s ease-in-out infinite;
}

.pokeball-center {
  animation: pokeballCenterScale 1s ease-in-out infinite;
  transform-origin: center center;
}
</style>
