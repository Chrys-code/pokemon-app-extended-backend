import { Request, Response } from "express";
import { Pokemons } from "../models/pokemons.model";
import PokemonsModel from "../models/pokemons.model";

const asyncHandler = require("express-async-handler");

export const listPokemons = asyncHandler(async (req: Request, res: Response) => {

    const { userId } = res.locals;

    try {
        const pokemonsCollection: Pokemons | null = await PokemonsModel.findOne({ userId });

        if (!pokemonsCollection) {
            return res.status(404).send({
                success: false,
                message: "Could not find collection for user",
                pokemons: []
            })
        }

        return res.status(200).send({
            success: true,
            pokemons: pokemonsCollection.pokemons
        })
    }
    catch (err: any) {
        return res.status(500).send({
            success: false,
            message: err.message
        })
    }
});


export const catchPokemon = asyncHandler(async (req: Request, res: Response) => {

    const { pokemon } = req.body;
    const { userId } = res.locals;

    try {
        const pokemonsCollection: Pokemons = await PokemonsModel.findOneAndUpdate(
            { userId: userId },
            { $push: { pokemons: pokemon } },
            { new: true, upsert: true }
        );

        return res.status(200).send({
            success: true,
            pokemons: pokemonsCollection.pokemons
        })
    }
    catch (err: any) {
        return res.status(500).send({
            success: false,
            message: err.message
        })
    }
});

export const releasePokemon = asyncHandler(async (req: Request, res: Response) => {

    const { pokemonId } = req.body;
    const { userId } = res.locals;

    try {
        const pokemonsCollection: Pokemons = await PokemonsModel.findOneAndUpdate(
            { userId: userId },
            { $pull: { pokemons: { id: pokemonId } } },
            { new: true, upsert: true }
        );

        if (!pokemonsCollection) {
            return res.status(404).send({
                success: false,
                message: "No collection found!"
            })
        }

        return res.status(200).send({
            success: true,
            pokemons: pokemonsCollection.pokemons
        })
    }
    catch (err: any) {
        return res.status(500).send({
            success: false,
            message: err.message
        })
    }

});
