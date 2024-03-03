import Joi from "joi";
import { PASSWD_REGEX } from "../constants.js";

export const registerUserSchema = Joi.object({
  name: Joi.string().min(1).max(32).required().messages({
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least {#limit} characters long",
    "string.max": "Name must not exceed {#limit} characters",
    "any.required": "Name is required",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.empty": "Email cannot be empty",
      "string.email": "Enter a valid email address",
      "any.required": "Email is required",
    }),
  password: Joi.string().regex(PASSWD_REGEX).required().messages({
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
    "string.pattern.base":
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.empty": "Email cannot be empty",
      "string.email": "Enter a valid email address",
      "any.required": "Email is required",
    }),
  password: Joi.string().regex(PASSWD_REGEX).required().messages({
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
    "string.pattern.base": "Invalid password",
  }),
});
