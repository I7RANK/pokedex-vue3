import { describe, it, expect } from "vitest";
import { filterPokemonByName } from "@/utils/filterPokemonByName";

const mockList = [
  { name: "pikachu", url: "url1" },
  { name: "bulbasaur", url: "url2" },
  { name: "charmander", url: "url3" },
  { name: "squirtle", url: "url4" },
];

describe("filterPokemonByName", () => {
  it("should return all pokemons if query is empty", () => {
    const result = filterPokemonByName("", mockList);
    expect(result).toEqual(mockList);
  });

  it("should filter pokemons by partial match", () => {
    const result = filterPokemonByName("char", mockList);
    expect(result).toEqual([{ name: "charmander", url: "url3" }]);
  });

  it("should be case-insensitive", () => {
    const result = filterPokemonByName("PIKA", mockList);
    expect(result).toEqual([{ name: "pikachu", url: "url1" }]);
  });

  it("should return empty array if no match found", () => {
    const result = filterPokemonByName("mewtwo", mockList);
    expect(result).toEqual([]);
  });

  it("should trim whitespace in query", () => {
    const result = filterPokemonByName("  squirtle  ", mockList);
    expect(result).toEqual([{ name: "squirtle", url: "url4" }]);
  });
});
