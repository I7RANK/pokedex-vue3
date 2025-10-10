import { endpoints } from '@/config/endpoints'
import { adaptPokemonDetailed } from '@/adapters/pokemonDetailed.adapter'
import type { PokemonDetailed } from '@/types/pokemon.type'

const BASE_URL: string = import.meta.env.VITE_BASE_URL

export async function fetchPokemonByName(name: string): Promise<PokemonDetailed | undefined> {
  const { url, method } = endpoints.getPokemonByName
  try {
    const response = await fetch(`${BASE_URL}${url}/${name}`, {
      method,
    })
    const data = await response.json()
    return adaptPokemonDetailed(data)
  } catch (error) {
    console.error(error)
  }
}
