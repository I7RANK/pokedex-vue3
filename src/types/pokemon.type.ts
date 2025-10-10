export type Pokemon = {
  name: string
}

export type PokemonResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Pokemon[]
}

export type PokemonDetailed = {
  height: number
  name: string
  sprite: string
  types: string
  weight: number
  stringToShare: string
}
