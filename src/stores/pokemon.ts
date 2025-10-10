import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchAllPokemon } from '@/services/fetchAllPokemon'
import type { Pokemon, FavoritesMap } from '@/types/pokemon.type'
import type { FooterFilterOptions } from '@/types/filters.type'
import { filterPokemonByName } from '@/utils/filterPokemonByName'
import { FOOTER_FILTER_OPTIONS } from '@/constants/filters'

const FAVORITES_KEY = 'favorites:items'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemonList = ref<Pokemon[]>([])
  const offset = ref(0)
  const query = ref('')
  const favorites = ref<FavoritesMap>({})
  const selectedFilter = ref<FooterFilterOptions>(FOOTER_FILTER_OPTIONS.ALL)

  const filteredPokemonList = computed((): Pokemon[] => {
    let baseList = pokemonList.value
    if (selectedFilter.value === FOOTER_FILTER_OPTIONS.ALL && query.value === '') {
      return pokemonList.value.slice(0, offset.value)
    }
    if (selectedFilter.value === FOOTER_FILTER_OPTIONS.FAVORITES)
      baseList = getFavoritePokemonList()
    return filterPokemonByName(query.value, baseList)
  })

  const initPokemonList = async () => {
    offset.value = 0
    pokemonList.value = await fetchAllPokemon()
  }

  const loadMorePokemon = async () => {
    offset.value += 20
  }

  const restoreFavorites = () => {
    try {
      const savedFavorites = localStorage.getItem(FAVORITES_KEY)
      if (savedFavorites) {
        const parsed = JSON.parse(savedFavorites) as FavoritesMap
        favorites.value = Object.fromEntries(
          Object.entries(parsed).filter(([_, fav]) => fav.isFavorite),
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  const toggleFavorite = (pokemon: Pokemon) => {
    const { name } = pokemon
    if (!favorites.value[name]) {
      favorites.value[name] = { pokemon, isFavorite: true }
    } else {
      favorites.value[name].isFavorite = !favorites.value[name].isFavorite
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites.value))
  }

  const getFavoritePokemonList = (): Pokemon[] => {
    return Object.values(favorites.value)
      .filter((favorite) => favorite.isFavorite)
      .map((favorite) => favorite.pokemon)
  }

  const setSelectedFilter = (filterName: FooterFilterOptions) => (selectedFilter.value = filterName)

  return {
    selectedFilter,
    favorites,
    query,
    filteredPokemonList,
    setSelectedFilter,
    initPokemonList,
    loadMorePokemon,
    toggleFavorite,
    restoreFavorites,
  }
})
