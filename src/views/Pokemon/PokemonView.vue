<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import PokeBallLoader from '@/components/PokeBallLoader.vue'
import { usePokemonStore } from '@/stores/pokemon'
import PokemonCard from './components/PokemonCard.vue'

const pokemonStore = usePokemonStore()

const loading = ref(true)
const sentinel = ref(null)

const createObserver = () => {
  if (!sentinel.value) return
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) pokemonStore.fetchNextPokemonList()
    },
    { threshold: 1 },
  )
  observer.observe(sentinel.value)
}

onMounted(async () => {
  if (!pokemonStore.pokemonList.length) await pokemonStore.initPokemonList()
  loading.value = false
  nextTick(createObserver)
})
</script>

<template>
  <div>
    <div v-if="loading" class="fixed top-0 left-0 flex h-screen w-full items-center justify-center">
      <PokeBallLoader />
    </div>
    <div v-else>
      <div class="mt-10 flex flex-col gap-y-2.5">
        <PokemonCard
          v-for="pokemon in pokemonStore.pokemonList"
          :key="pokemon.name"
          :is-favorite="false"
          :name="pokemon.name"
        />
      </div>

      <div ref="sentinel" class="h-10" />
    </div>
  </div>
</template>
