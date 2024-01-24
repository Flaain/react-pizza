import express from "express";
import { AuthController } from "../../controllers/AuthController.js";
import { validateData, limit } from "./middlewares.js";
import { userSigninSchema, userSignupSchema } from "../../models/User.js";

export const router = express.Router();

router.post("/auth/signup", limit, validateData(userSignupSchema), AuthController.signup);
router.post("/auth/signin", limit, validateData(userSigninSchema), AuthController.signin);
router.get("/auth/profile", AuthController.profile);