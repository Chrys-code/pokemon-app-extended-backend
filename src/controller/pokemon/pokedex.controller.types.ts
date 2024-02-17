import { Response } from "express";
import { PokemonId } from "../../models/pokedex.model";
import { SerializedPokemon } from "../../utils/serializers/pokemon.serializer";

export type PokedexResponse = Response<{
    success: boolean,
    message?: string,
    pokemons: PokemonId[],
    allPokemons: { [x: string]: SerializedPokemon },
    pokemonTypes: string[]
}>
