import { Schema, Types, model } from 'mongoose';

export interface Pokemons {
    _id?: Types.ObjectId,
    userId: Types.ObjectId,
    pokemons: { id: string }[],
}

const pokemonsSchema = new Schema<Pokemons>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    pokemons: {
        type: [{ id: { type: String } }],
        required: false,
    }
});

module.exports = model<Pokemons>('Pokemons', pokemonsSchema);