import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchAllPokemon } from '@/services/fetchAllPokemon'
import type { Pokemon } from '@/types/pokemon.type'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemonList = ref<Pokemon[]>([])
  const offset = ref(0)

  const initPokemonList = async () => {
    offset.value = 0
    pokemonList.value = await fetchAllPokemon(offset.value)
  }

  const fetchNextPokemonList = async () => {
    offset.value += 20
    const newPokemon = await fetchAllPokemon(offset.value)
    pokemonList.value.push(...newPokemon)
  }

  return { pokemonList, initPokemonList, fetchNextPokemonList }
})
