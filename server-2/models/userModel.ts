import mongoose, { Schema, Document } from "mongoose";

export interface UserSchema extends Document {
    userName: string,
    email: string,
    password: string 
}

const userSchema: Schema<UserSchema> = new Schema({
    userName: {
        type: String,
        required: [true, 'userName is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
}, 
{ timestamps: true }
)

const userModel = mongoose.model('User', userSchema)

export default userModel