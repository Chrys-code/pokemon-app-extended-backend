import { Schema, Types, model, Document } from 'mongoose';

export interface Pokemons extends Document {
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
        type: [{
            id: { type: String, required: true },
            url: { type: String, required: true },
            name: { type: String, required: true }
        }],
        required: false,
    }
});

export default model<Pokemons>('Pokemons', pokemonsSchema);