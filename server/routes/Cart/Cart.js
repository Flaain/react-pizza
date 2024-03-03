import express from "express";
import { cartController } from "../../controllers/CartController.js";
import { zodCartSchema, zodCartSchemaAsArray, zodQuantitySchema } from "../../models/Cart.js";
import { validateData } from "../../utils/helpers/validators.js";

export const router = express.Router();

router.post("/cart", validateData(zodCartSchemaAsArray), cartController.getCart);
router.post("/cart/add", validateData(zodCartSchema.pick({ productId: true, size: true, type: true })), cartController.addToCart);

router.patch("/cart/update/:id", validateData(zodQuantitySchema), cartController.changeQuantity);

router.put("/cart/update", validateData(zodCartSchemaAsArray), cartController.updateCart);
router.put("/cart/clear", cartController.clearCart);

router.delete("/cart/remove/:id", cartController.removeProductFromCart);