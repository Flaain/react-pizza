import express from "express";
import { orderController } from "../../controllers/OrderController.js";

export const router = express.Router();

router.post("/order/checkout/create-checkout-session", orderController.createCheckoutSession);
router.post("/order/checkout/webhook", orderController.stripeCheckoutWebhook);
router.post("/order/create", orderController.createOrder);