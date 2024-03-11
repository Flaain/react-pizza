import express from "express";
import { validateData } from "../../utils/helpers/validators.js";
import { userController } from "../../controllers/UserController.js";
import { zodAddressSchema, zodDeliveryInfo } from "../../models/DeliveryInfo.js";

export const router = express.Router();

router.put("/profile/update/delivery-info", validateData(zodDeliveryInfo), userController.updateDeliveryInfo);
router.put("/profile/update/payment-info", validateData(zodDeliveryInfo), userController.updatePaymentInfo);

router.post("/profile/add/address", validateData(zodAddressSchema), userController.setAddress);