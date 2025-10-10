import type { PokemonDetailed } from '@/types/pokemon.type'

export function adaptPokemonDetailed(apiResponse: Record<string, any>): PokemonDetailed {
  const { name, height, weight } = apiResponse
  const types = apiResponse.types
    .map((typeInfo: { type: { name: string } }) => typeInfo.type.name)
    .join(', ')
  const sprite = apiResponse.sprites.other['official-artwork'].front_default
  const stringToShare = `${name}, ${weight}, ${height}, ${types}`

  return {
    height,
    name,
    sprite,
    types,
    weight,
    stringToShare,
  }
}
