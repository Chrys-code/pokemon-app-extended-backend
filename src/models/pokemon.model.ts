import { Schema, model, Document } from 'mongoose';

export interface PokemonInput {
    pokemonId: string, url: string, name: string,
}

export interface Pokemon extends PokemonInput, Document {
    updatedAt: Date,
    createdAt: Date,
}

const PokemonSchema = new Schema<Pokemon>({
    pokemonId: { type: String, required: true },
    url: { type: String, required: true },
    name: { type: String, required: true }
},
    {
        timestamps: true,

    }
);

export default model<Pokemon>('Pokemon', PokemonSchema);