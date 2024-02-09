import { Request, Response } from "express";

const asyncHandler = require("express-async-handler");
const PokemonsModel = require("../models/pokemons.model");


const listPokemons = asyncHandler(async (req: Request, res: Response) => {

    // Get data
    // Should grab the user ID from decoded Token in req.user generated from middleware
    const { userId } = req.body;

    try {
        // Get the collection for user
        const collection = PokemonsModel.findOne({ userId: userId });

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
        const pokemons = PokemonsModel.findOne({ userId: userId });

        // If non found create and save
        if (!pokemons) {
            const newPokemonCollection = new PokemonsModel({
                userId: userId,
                collection: [pokemonId],
            })

            newPokemonCollection.save();

            return res.status(200).send({
                success: true,
                collection: newPokemonCollection
            })
        }

        // Append pokemonId to collections list then save
        pokemons.collection = [...pokemons.collection, pokemonId];

        pokemons.save();

        return res.status(200).send({
            success: true,
            pokemons
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
        // Get the collection for user
        const pokemons = PokemonsModel.findOne({ userId: userId });

        // If non found
        if (!pokemons) {
            return res.status(200).send({
                success: true,
                message: "No collection found!"
            })
        }

        // Filter out pokemonId from collections list then save
        pokemons.collection = pokemons.collection.filter((id: string) => id !== pokemonId);

        pokemons.save();

        return res.status(200).send({
            success: true,
            pokemons
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