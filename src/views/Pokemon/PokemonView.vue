<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePokemonStore } from '@/stores/pokemon'
import PokeBallLoader from '@/components/PokeBallLoader.vue'
import PokemonCard from './components/PokemonCard.vue'
import SearchInput from './components/SearchInput.vue'
import NotFoundMessage from './components/NotFoundMessage.vue'
import FooterFilters from './components/FooterFilters.vue'
import PokemonDetailsModal from './components/PokemonDetailsModal.vue'
import { FOOTER_FILTER_OPTIONS } from '@/constants/filters'
import { storage } from '@/utils/storage'
import { FAVORITES_KEY } from '@/constants/storageKeys'
import type { Pokemon } from '@/types/pokemon.type'

const pokemonStore = usePokemonStore()
const { query, filteredPokemonList } = storeToRefs(pokemonStore)

const loading = ref(true)
const sentinel = ref(null)
const showModal = ref(false)
const selectedPokemonName = ref<string>('')

const openModal = (pokemonName: string) => {
  selectedPokemonName.value = pokemonName
  showModal.value = true
}

const handleCloseModal = () => {
  showModal.value = false
  selectedPokemonName.value = ''
}

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

const restoreFavorites = () => {
  const favoritesPokemon = storage.get<string[]>(FAVORITES_KEY)
  if (favoritesPokemon) {
    pokemonStore.setFavorites(favoritesPokemon)
    return
  }
  pokemonStore.setFavorites([])
}

const addToFavorites = (name: string) => {
  pokemonStore.setPokemonToFavorites(name)
  storage.set(FAVORITES_KEY, pokemonStore.favorites)
}

const isFavorite = (name: string) => {
  return pokemonStore.favorites.includes(name)
}

onMounted(async () => {
  restoreFavorites()
  await pokemonStore.initPokemonList()
  loading.value = false
  nextTick(createObserver)
})
</script>

<template>
  <div>
    <PokemonDetailsModal
      :pokemon-name="selectedPokemonName"
      :show="showModal"
      :close="handleCloseModal"
      @click-favorites="addToFavorites"
    />
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
          :is-favorite="isFavorite(pokemon.name)"
          :name="pokemon.name"
          @click-favorites="addToFavorites(pokemon.name)"
          @click-card="openModal(pokemon.name)"
        />
      </div>

      <div ref="sentinel" class="h-10" />
      <FooterFilters
        v-if="
          filteredPokemonList.length ||
          pokemonStore.selectedFilter === FOOTER_FILTER_OPTIONS.FAVORITES
        "
        :initial-selected-filter="pokemonStore.selectedFilter"
        @filter-change="pokemonStore.setSelectedFilter"
      />
    </div>
  </div>
</template>
