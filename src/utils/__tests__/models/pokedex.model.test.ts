import connectToDB, { disconnectFromDB } from "../../../config/db_config";
import PokedexModel, { Pokedex, PokedexInput } from "../../../models/pokedex.model";
import { mockPokedex } from "../data/mockdata";

describe("Pokemons Model Testing", () => {
    beforeAll(async () => {
        await connectToDB();
    });

    afterAll(async () => {
        await PokedexModel.collection.drop();
        await disconnectFromDB();
    });

    it("Should create pokemon collection for user", async () => {
        // Prepare
        const initPokedex: PokedexInput = mockPokedex;

        // Act
        const pokemons: Pokedex = new PokedexModel(initPokedex);
        const createdPokemons: Pokedex = await pokemons.save();

        // Assert
        expect(createdPokemons).toBeDefined();
        expect(createdPokemons).toHaveProperty("_id");
        expect(createdPokemons).toHaveProperty("userId");
        expect(createdPokemons).toHaveProperty("pokemons");

        expect(createdPokemons.userId).toEqual(initPokedex.userId)
        expect(createdPokemons.pokemons).toEqual(initPokedex.pokemons)
    });
});
