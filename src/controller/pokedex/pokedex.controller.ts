import { Request, Response } from "express";
import { Pokedex } from "../../models/pokedex.model";
import PokedexModel from "../../models/pokedex.model";
import { PokedexResponse } from "./pokedex.controller.types";

const asyncHandler = require("express-async-handler");

export const getPokedex = asyncHandler(async (req: Request, res: Response): Promise<PokedexResponse> => {

    const { userId } = res.locals;

    try {
        const pokedex: Pokedex | null = await PokedexModel.findOne({ userId });

        if (!pokedex) {
            return res.status(200).send({
                success: true,
                message: "Could not find collection for user",
                pokemons: [],
            })
        }

        return res.status(200).send({
            success: true,
            pokemons: pokedex.pokemons || [],
        })
    }
    catch (err: any) {
        return res.status(500).send({
            success: false,
            message: err.message,
            pokemons: [],
        })
    }
});


export const addToPokedex = asyncHandler(async (req: Request, res: Response): Promise<PokedexResponse> => {

    const { pokemonId } = req.body;
    const { userId } = res.locals;

    try {

        const pokedex: Pokedex = await PokedexModel.findOneAndUpdate(
            { userId: userId },
            { $push: { pokemons: pokemonId } },
            { new: true, upsert: true }
        );

        return res.status(200).send({
            success: true,
            pokemons: pokedex.pokemons || []
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

export const removeFromPokedex = asyncHandler(async (req: Request, res: Response): Promise<PokedexResponse> => {

    const { pokemonId } = req.body;
    const { userId } = res.locals;

    try {
        const pokedex: Pokedex = await PokedexModel.findOneAndUpdate(
            { userId: userId },
            { $pull: { pokemons: pokemonId } },
            { new: true, upsert: true }
        );

        if (!pokedex) {
            return res.status(404).send({
                success: false,
                message: "No collection found!",
                pokemons: []
            })
        }

        return res.status(200).send({
            success: true,
            pokemons: pokedex.pokemons || []
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
