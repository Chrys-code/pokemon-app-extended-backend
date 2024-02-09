import { Schema, Types, model } from 'mongoose';

export interface Pokemons {
    _id?: Types.ObjectId,
    userId: Types.ObjectId,
    pokemons: string[],
}

const pokemonsSchema = new Schema<Pokemons>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    pokemons: {
        type: [String],
        required: false,
    }
});

module.exports = model<Pokemons>('Pokemons', pokemonsSchema);