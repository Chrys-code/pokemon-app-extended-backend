import mongoose, { Schema, Types, model, Document } from 'mongoose';

export type PokemonId = mongoose.Types.ObjectId;

export interface PokedexInput {
    userId: Types.ObjectId,
    pokemons: PokemonId[],
}

export interface Pokedex extends PokedexInput, Document {
    userId: Types.ObjectId,
    updatedAt: Date,
    createdAt: Date,
}

const PokedexSchema = new Schema<Pokedex>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        pokemons: [{
            type: Schema.Types.ObjectId,
            ref: 'Pokemon',
            required: false,
        }]
    },
    {
        timestamps: true,
    }
);

export default model<Pokedex>('Pokedex', PokedexSchema);