import { Schema, model, Document } from 'mongoose';

export interface UserInput {
    email: string,
    password: string,
}

export interface User extends UserInput, Document {
    updatedAt: Date,
    createdAt: Date,
}

const UserSchema = new Schema<User>(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default model<User>('User', UserSchema);