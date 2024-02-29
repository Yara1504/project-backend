import { model, Schema } from 'mongoose';
import Joi from "joi";

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    token: String
}, { versionKey: false, timestamps: true });

const registerSchema = Joi.object({
    password: Joi.string().min(4).max(10).required(),
    email: Joi.string().email().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
})

const loginSchema = Joi.object({
    password: Joi.string().min(4).max(10).required(),
    email: Joi.string().email().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
})

export const schema = {
    registerSchema,
    loginSchema
}

export const User = model('user', userSchema);
