import { Request, Response } from "express";
import { Pokedex } from "../models/pokedex.model";
import PokedexModel from "../models/pokedex.model";
import PokemonModel, { Pokemon } from "../models/pokemon.model";

const asyncHandler = require("express-async-handler");

export const getPokedex = asyncHandler(async (req: Request, res: Response) => {

    const { userId } = res.locals;

    try {
        const pokedex: Pokedex | null = await PokedexModel.findOne({ userId });

        if (!pokedex) {
            return res.status(404).send({
                success: false,
                message: "Could not find collection for user",
                pokemons: []
            })
        }

        const pokedexPokemons: Pokemon[] = await PokemonModel.find({ _id: { $in: pokedex.pokemons } });

        return res.status(200).send({
            success: true,
            pokemons: pokedexPokemons || []
        })
    }
    catch (err: any) {
        return res.status(500).send({
            success: false,
            message: err.message,
            pokemons: []
        })
    }
});


export const addToPokedex = asyncHandler(async (req: Request, res: Response) => {

    const { pokemon } = req.body;
    const { userId } = res.locals;


    try {

        let dbPokemon: Pokemon | null = await PokemonModel.findOne({ pokemonId: pokemon.pokemonId });

        if (!dbPokemon) {
            const pokemonCopy: Pokemon = new PokemonModel(pokemon);
            dbPokemon = await pokemonCopy.save();
        }

        if (!dbPokemon) {
            return res.status(500).send({
                success: false,
                message: "Could not create pokemon before adding to collection",
                pokemons: []
            })
        }

        const pokedex: Pokedex = await PokedexModel.findOneAndUpdate(
            { userId: userId },
            { $push: { pokemons: dbPokemon._id } },
            { new: true, upsert: true }
        );

        const pokedexPokemons: Pokemon[] = await PokemonModel.find({ _id: { $in: pokedex.pokemons } });

        return res.status(200).send({
            success: true,
            pokemons: pokedexPokemons || []
        })
    }
    catch (err: any) {
        return res.status(500).send({
            success: false,
            message: err.message,
            pokemons: []
        })
    }
});

export const removeFromPokedex = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.query;
    const { userId } = res.locals;

    try {
        const pokedex: Pokedex = await PokedexModel.findOneAndUpdate(
            { userId: userId },
            { $pull: { pokemons: id } },
            { new: true, upsert: true }
        );

        if (!pokedex) {
            return res.status(404).send({
                success: false,
                message: "No collection found!",
                pokemons: []
            })
        }

        const pokedexPokemons: Pokemon[] = await PokemonModel.find({ _id: { $in: pokedex.pokemons } });

        return res.status(200).send({
            success: true,
            pokemons: pokedexPokemons || []
        })
    }
    catch (err: any) {
        return res.status(500).send({
            success: false,
            message: err.message,
            pokemons: []
        })
    }

});
