import { Request, Response } from "express";

const asyncHandler = require("express-async-handler");
const PokemonsModel = require("../models/pokemons.model");

const listPokemons = asyncHandler(async (req: Request, res: Response) => {

    // Get data
    // Should grab the user ID from decoded Token in req.user generated from middleware
    const { id } = req.params;

    try {
        // Get the collection for user
        const collection = await PokemonsModel.findOne({ userId: id });

        // If non found send empty array
        if (!collection) {
            return res.status(404).send({
                success: false,
                message: "Could not find collection for user",
                collection: []
            })
        }

        return res.status(200).send({
            success: true,
            collection: collection
        })
    }
    catch (err: any) {
        return res.status(412).send({
            success: false,
            message: err.message
        })
    }
});



const catchPokemon = asyncHandler(async (req: Request, res: Response) => {

    // Get data
    // Should grab the user ID from decoded Token in req.user generated from middleware
    const { userId, pokemonId } = req.body;

    try {
        // Get the collection for user
        const pokemonsCollection = await PokemonsModel.findOneAndUpdate(
            { userId: userId },
            { $push: { pokemons: { id: pokemonId } } },
            { new: true, upsert: true }
        );

        return res.status(200).send({
            success: true,
            pokemons: pokemonsCollection
        })
    }
    catch (err: any) {
        return res.status(412).send({
            success: false,
            message: err.message
        })
    }

});

const releasePokemon = asyncHandler(async (req: Request, res: Response) => {

    // Get data
    // Should grab the user ID from decoded Token in req.user generated from middleware
    const { userId, pokemonId } = req.body;

    try {

        // Remove pokemon from collection
        const pokemonsCollection = await PokemonsModel.findOneAndUpdate(
            { userId: userId },
            { $pull: { pokemons: { id: pokemonId } } },
            { new: true, upsert: true }
        );

        // If non found
        if (!pokemonsCollection) {
            return res.status(200).send({
                success: true,
                message: "No collection found!"
            })
        }

        return res.status(200).send({
            success: true,
            pokemons: pokemonsCollection
        })
    }
    catch (err: any) {
        return res.status(412).send({
            success: false,
            message: err.message
        })
    }

});



module.exports = {
    releasePokemon,
    listPokemons,
    catchPokemon,
}