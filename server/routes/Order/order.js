import express from "express";
import { validateData } from "../../utils/helpers/validators.js";
import { orderController } from "../../controllers/OrderController.js";
import { zodDeliveryInfo } from "../../models/DeliveryInfo.js";

export const router = express.Router();

router.get("/orders", orderController.getOrders);

router.post("/order/checkout/create-checkout-session", orderController.createCheckoutSession);
router.post("/order/checkout/webhook", orderController.stripeCheckoutWebhook);
router.post("/order/checkout/delivery-info", validateData(zodDeliveryInfo), orderController.updateDeliveryInfo);
router.post("/order/create", orderController.createOrder);