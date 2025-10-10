export type Pokemon = {
  name: string
  url: string
}

export type PokemonResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Pokemon[]
}

type Favorite = { pokemon: Pokemon; isFavorite: boolean }
export type FavoritesMap = Record<string, Favorite>
