import { Schema, Types, model } from 'mongoose';

export interface User {
    _id?: Types.ObjectId,
    email: string,
    password: string,
}

const userSchema = new Schema<User>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = model<User>('User', userSchema);