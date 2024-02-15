import express from "express";
import { CartController } from "../../controllers/CartController.js";

export const router = express.Router();

router.post("/cart", CartController.getCart);