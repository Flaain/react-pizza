import { router as authRouter } from "./Auth/Auth.js";
import { router as cartRouter } from "./Cart/Cart.js";
import { router as orderRouter } from "./Order/order.js";

export const routes = [authRouter, cartRouter, orderRouter];