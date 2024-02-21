import express from "express";
import { cartController } from "../../controllers/CartController.js";
import { zodCartSchema, zodCartSchemaAsArray, zodQuantitySchema } from "../../models/Cart.js";
import { validateData } from "../../utils/helpers/validators.js";

export const router = express.Router();

router.post("/cart", validateData(zodCartSchemaAsArray), cartController.getCart);
router.post("/cart/update", validateData(zodCartSchemaAsArray), cartController.updateCart);
router.post("/cart/update/:id", validateData(zodQuantitySchema), cartController.changeQuantity);
router.post("/cart/add", validateData(zodCartSchema.pick({ id: true, size: true, type: true })), cartController.addToCart);

router.delete("/cart/remove/:id", cartController.removeProductFromCart);

router.put("/cart/clear", cartController.clearCart);
