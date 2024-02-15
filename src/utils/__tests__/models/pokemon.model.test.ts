import connectToDB, { disconnectFromDB } from "../../../config/db_config";
import PokemonModel, { Pokemon, PokemonInput } from "../../../models/pokemon.model";
import { mockPokemons } from "../data/mockdata";

describe("Pokemons Model Testing", () => {
    beforeAll(async () => {
        await connectToDB();
    });

    afterAll(async () => {
        await PokemonModel.collection.drop();
        await disconnectFromDB();
    });

    it("Should create pokemon collection for user", async () => {
        // Prepare
        const initPokemon: PokemonInput = mockPokemons;

        // Act
        const pokemons: Pokemon = new PokemonModel(initPokemon);
        const createdPokemons: Pokemon = await pokemons.save();

        // Assert
        expect(createdPokemons).toBeDefined();
        expect(createdPokemons).toHaveProperty("_id");
        expect(createdPokemons).toHaveProperty("pokemonId");
        expect(createdPokemons).toHaveProperty("url");
        expect(createdPokemons).toHaveProperty("name");
        expect(createdPokemons).toHaveProperty("createdAt");
        expect(createdPokemons).toHaveProperty("updatedAt");
    });
});
