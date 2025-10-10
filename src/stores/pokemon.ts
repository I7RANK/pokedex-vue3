import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchAllPokemon } from '@/services/fetchAllPokemon'
import type { Pokemon } from '@/types/pokemon.type'
import { filterPokemonByName } from '@/utils/filterPokemonByName'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemonList = ref<Pokemon[]>([])
  const offset = ref(0)
  const query = ref('')

  const filteredPokemonList = computed((): Pokemon[] => {
    if (query.value === '') return pokemonList.value.slice(0, offset.value)
    return filterPokemonByName(query.value, pokemonList.value)
  })

  const initPokemonList = async () => {
    offset.value = 0
    pokemonList.value = await fetchAllPokemon()
  }

  const loadMorePokemon = async () => {
    offset.value += 20
  }

  return { query, filteredPokemonList, initPokemonList, loadMorePokemon }
})
