import { Request, Response } from "express";
import { getPokemonTypesFromExtApi, getPokemonsFromExtApi } from "../../services/pokeApi/pokeApi";
import { PokemonResponse } from "./pokemon.controller.types";

const asyncHandler = require("express-async-handler");

export const getPokemons = asyncHandler(async (req: Request, res: Response): Promise<PokemonResponse> => {

    try {

        const allPokemons = await getPokemonsFromExtApi();
        const allPokemonTypes = await getPokemonTypesFromExtApi();

        return res.status(200).send({
            success: true,
            pokemons: allPokemons,
            pokemonTypes: allPokemonTypes,
        })
    }
    catch (err: any) {
        return res.status(500).send({
            success: false,
            message: err.message,
            pokemons: [],
            pokemonTypes: [],
        })
    }
});
