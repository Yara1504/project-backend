import { model, Schema } from 'mongoose';
import Joi from "joi";

const userSchema = new Schema({
    name: {
      type: String,
      required: [true, "Username is required"],
    },
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    avatarURL: {
      type: String,
      default: "",
    },
    boards: [
      {
        type: Schema.Types.ObjectId,
        ref: "board",
        default: [],
      },
    ],
    theme: {
      type: String,
      enum: themeTypes,
      default: "dark",
    },
    token: String
}, { versionKey: false, timestamps: true });


const registerSchema = Joi.object({
    name: Joi.string().min(1).max(20).required(),
    password: Joi.string().min(4).max(10).required(),
    email: Joi.string().email().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
})

const loginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
})

export const schema = {
    registerSchema,
    loginSchema
}

export const User = model('user', userSchema);
