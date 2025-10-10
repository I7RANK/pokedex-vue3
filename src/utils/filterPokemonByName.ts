export function filterPokemonByName(
  query: string,
  list: { name: string; url: string }[],
) {
  const normalizedSearch = query.trim().toLowerCase();
  if (normalizedSearch === "") return list;
  return list.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(normalizedSearch),
  );
}
