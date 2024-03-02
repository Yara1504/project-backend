import express from "express";
import {authenticate} from "../middlewares/authenticate.js"
import { schema } from "../models/users.js";
import {
    register,
    login,
    getCurrent
} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", validateBody(schema.registerSchema), register);
router.post("/login", validateBody(schema.loginSchema), login);
router.get("/current", authenticate, getCurrent);

export default router;
