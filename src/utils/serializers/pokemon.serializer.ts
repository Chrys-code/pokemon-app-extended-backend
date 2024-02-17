import { PokeApiPokemonResponse } from "../../services/pokeApi/pokeApi.types";

export interface SerializedPokemon {
    id: string,
    name: string,
    url: string,
    abilities: string[],
    types: string[],
    height: number,
    weight: number,
    image: string,
}

export const serializePokemonFromApi = (pokemon: PokeApiPokemonResponse): SerializedPokemon => {

    let pokemonAbilities: string[] = [];
    let pokemonTypes: string[] = [];

    pokemon.abilities.forEach((ability: { ability: { name: string, }, is_hidden: boolean }) => {
        ability.is_hidden == false && pokemonAbilities.push(ability.ability.name);
    });

    pokemon.types.forEach((type: { type: { name: string } }) => {
        pokemonTypes.push(type.type.name);
    })

    const pokemonCopy: SerializedPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        url: pokemon.url,
        abilities: pokemonAbilities,
        types: pokemonTypes,
        weight: pokemon.weight,
        height: pokemon.height,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
    }

    return pokemonCopy;
}