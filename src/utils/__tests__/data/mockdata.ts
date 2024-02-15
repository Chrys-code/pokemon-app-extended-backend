import mongoose from "mongoose";
import { PokedexInput } from "../../../models/pokedex.model";
import { PokemonInput } from "../../../models/pokemon.model";
import { UserInput } from "../../../models/user.model";

export const mockUser: UserInput = {
    email: "example@example.com",
    password: "example"
}

export const mockPokemons: PokemonInput = {
    pokemonId: "123asd23asd",
    url: "pokemonTestUrl",
    name: "Pikachu"
}

export const mockPokedex: PokedexInput = {
    userId: new mongoose.Types.ObjectId(),
    pokemons: [
        new mongoose.Types.ObjectId()
    ]
}