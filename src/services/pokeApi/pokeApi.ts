import { SerializedPokemon, serializePokemonFromApi } from "../../utils/serializers/pokemon.serializer";
import { PokeApiPokemon, PokeApiPokemonTypesResponse, PokeApiResponse } from "./pokeApi.types";


export const getPokemonsFromExtApi = async (limit: string = '20') => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`);
    const res: PokeApiResponse = await data.json();

    const promises = res.results.map(async (res: PokeApiPokemon) => {
        const pokemonDetailData = await fetch(`${res.url}`);
        const pokemonDetailRes = await pokemonDetailData.json();
        const serializedPokemon = serializePokemonFromApi({ ...pokemonDetailRes, url: res.url })
        return serializedPokemon;
    })

    return Promise.all(promises).then(res => {
        return res.reduce((prev: { [key: string]: SerializedPokemon }, current: SerializedPokemon) => ({
            ...prev,
            [current.id]: current
        }), {});
    })
}

export const getPokemonTypesFromExtApi = async () => {
    const data = await fetch("https://pokeapi.co/api/v2/type?limit=100&offset=0");
    const res: PokeApiPokemonTypesResponse = await data.json();

    return res.results.reduce((prev: string[], current: PokeApiPokemon) => ([
        ...prev,
        current.name
    ]), []);
}
