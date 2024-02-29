import express from "express";
import {authenticate} from "../middlewares/authenticate.js"
import { schema } from "../models/users.js";
import {
    register,
    login
} from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(schema.registerSchema), register);
authRouter.post("/login", validateBody(schema.loginSchema), login);

export default authRouter;
