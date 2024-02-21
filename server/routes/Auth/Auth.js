import express from "express";
import { authController } from "../../controllers/AuthController.js";
import { errorMessage, limit } from "./middleware.js";
import { userSigninSchema, userSignupSchema } from "../../models/User.js";
import { validateData } from "../../utils/helpers/validators.js";

export const router = express.Router();

router.post("/auth/signup", limit, validateData(userSignupSchema, errorMessage), authController.signup);
router.post("/auth/signin", limit, validateData(userSigninSchema, errorMessage), authController.signin);

router.get("/auth/profile", authController.profile);