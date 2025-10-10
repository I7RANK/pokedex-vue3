<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePokemonStore } from '@/stores/pokemon'
import PokeBallLoader from '@/components/PokeBallLoader.vue'
import PokemonCard from './components/PokemonCard.vue'
import SearchInput from './components/SearchInput.vue'
import NotFoundMessage from './components/NotFoundMessage.vue'
import FooterFilters from './components/FooterFilters.vue'
import { FOOTER_FILTER_OPTIONS } from '@/constants/filters'

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
  pokemonStore.restoreFavorites()
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
          :is-favorite="pokemonStore.favorites[pokemon.name]?.isFavorite || false"
          :name="pokemon.name"
          @on-click-favorites="pokemonStore.toggleFavorite(pokemon)"
        />
      </div>

      <div ref="sentinel" class="h-10" />
      <FooterFilters
        v-if="
          filteredPokemonList.length ||
          pokemonStore.selectedFilter === FOOTER_FILTER_OPTIONS.FAVORITES
        "
        :initial-selected-filter="pokemonStore.selectedFilter"
        @on-filter-change="pokemonStore.setSelectedFilter"
      />
    </div>
  </div>
</template>
