import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchAllPokemon } from '@/services/fetchAllPokemon'
import { fetchPokemonByName } from '@/services/fetchPokemonByName'
import type { Pokemon, PokemonDetailed } from '@/types/pokemon.type'
import type { FooterFilterOptions } from '@/types/filters.type'
import { filterPokemonByName } from '@/utils/filterPokemonByName'
import { FOOTER_FILTER_OPTIONS } from '@/constants/filters'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemonList = ref<Pokemon[]>([])
  const offset = ref(20)
  const query = ref('')
  const favorites = ref<string[]>([])
  const selectedFilter = ref<FooterFilterOptions>(FOOTER_FILTER_OPTIONS.ALL)
  const selectedPokemonDetailed = ref<PokemonDetailed>()

  const favoritePokemonList = computed(() => {
    return favorites.value.map((pokemonName) => {
      return { name: pokemonName }
    })
  })

  const filteredPokemonList = computed((): Pokemon[] => {
    const isFavorites = selectedFilter.value === FOOTER_FILTER_OPTIONS.FAVORITES
    const baseList = isFavorites ? favoritePokemonList.value : pokemonList.value

    if (selectedFilter.value === FOOTER_FILTER_OPTIONS.ALL && query.value === '') {
      return pokemonList.value.slice(0, offset.value)
    }

    return filterPokemonByName(query.value, baseList)
  })

  const initPokemonList = async () => {
    offset.value = 20
    if (!pokemonList.value.length) pokemonList.value = await fetchAllPokemon()
  }

  const getPokemonByName = async (name: string) => {
    if (selectedPokemonDetailed.value?.name === name) return
    selectedPokemonDetailed.value = await fetchPokemonByName(name)
  }

  const loadMorePokemon = async () => {
    offset.value += 20
  }

  const setFavorites = (savedFavorites: string[]) => (favorites.value = savedFavorites)

  const setPokemonToFavorites = (name: string) => {
    const index = favorites.value.indexOf(name)
    if (index > -1) {
      favorites.value.splice(index, 1)
    } else {
      favorites.value.push(name)
    }
  }

  const setSelectedFilter = (filterName: FooterFilterOptions) => (selectedFilter.value = filterName)

  return {
    selectedFilter,
    favorites,
    query,
    filteredPokemonList,
    selectedPokemonDetailed,
    setSelectedFilter,
    initPokemonList,
    loadMorePokemon,
    setPokemonToFavorites,
    setFavorites,
    getPokemonByName,
  }
})
