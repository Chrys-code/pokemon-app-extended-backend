import { Response } from "express";
import { PokemonId } from "../../models/pokedex.model";

export type PokedexResponse = Response<{
    success: boolean,
    message?: string,
    pokemons: PokemonId[],
}>

