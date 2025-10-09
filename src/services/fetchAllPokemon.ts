import { endpoints } from '@/config/endpoints'
import type { Pokemon, PokemonResponse } from '@/types/pokemon.type'

const BASE_URL: string = import.meta.env.VITE_BASE_URL

export async function fetchAllPokemon(offset = 0): Promise<Pokemon[]> {
  const { url, method } = endpoints.getAllPokemon
  try {
    const response = await fetch(`${BASE_URL}${url}?offset=${offset}&limit=20`, {
      method,
    })
    const data: PokemonResponse = await response.json()
    return data.results
  } catch (error) {
    console.error(error)
  }

  return []
}
