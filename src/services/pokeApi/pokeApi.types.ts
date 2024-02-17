export interface PokeApiPokemon {
    name: string, url: string
}

export interface PokeApiResponse {
    results: PokeApiPokemon[]
}

export interface PokeApiPokemonResponse {
    id: string,
    name: string,
    url: string,
    abilities: [
        {
            ability: {
                name: string,
            },
            is_hidden: boolean,
        }
    ],
    types: [
        {
            type: {
                name: string
            }
        }
    ],
    height: number,
    weight: number,
}

export interface PokeApiPokemonTypesResponse {
    results: PokeApiPokemon[]
}