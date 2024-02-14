import { Schema, Types, model, Document } from 'mongoose';

export interface User extends Document {
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

export default model<User>('User', userSchema);