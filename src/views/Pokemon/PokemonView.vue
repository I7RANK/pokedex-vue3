<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import PokeBallLoader from '@/components/PokeBallLoader.vue'
import { usePokemonStore } from '@/stores/pokemon'
import PokemonCard from './components/PokemonCard.vue'
import SearchInput from './components/SearchInput.vue'
import NotFoundMessage from './components/NotFoundMessage.vue'
import { storeToRefs } from 'pinia'

const pokemonStore = usePokemonStore()

const loading = ref(true)
const sentinel = ref(null)
const { query, filteredPokemonList } = storeToRefs(pokemonStore)

const createObserver = () => {
  if (!sentinel.value) return
  const observer = new IntersectionObserver(
    (entries) => {
      if (query.value !== '') return
      if (entries[0]?.isIntersecting) pokemonStore.loadMorePokemon()
    },
    { threshold: 1 },
  )
  observer.observe(sentinel.value)
}

onMounted(async () => {
  if (!filteredPokemonList.value.length) await pokemonStore.initPokemonList()
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
      <div>
        <SearchInput v-model="query" />
        <NotFoundMessage v-if="!filteredPokemonList.length" />
      </div>
      <div class="mt-10 flex flex-col gap-y-2.5">
        <PokemonCard
          v-for="pokemon in filteredPokemonList"
          :key="pokemon.name"
          :is-favorite="false"
          :name="pokemon.name"
        />
      </div>

      <div ref="sentinel" class="h-10" />
    </div>
  </div>
</template>
