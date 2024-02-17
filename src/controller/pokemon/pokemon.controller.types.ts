
import { Response } from "express";
import { SerializedPokemon } from "../../utils/serializers/pokemon.serializer";

export type PokemonResponse = Response<{
    success: boolean,
    message?: string,
    pokemons: { [x: string]: SerializedPokemon },
    pokemonTypes: string[]
}>

