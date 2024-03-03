import Stripe from "stripe";
import { ConfigController } from "./ConfigController.js";
import { initialSizes, initialTypes } from "../utils/constants/initial.js";
import { Order } from "../models/Order.js";

class OrderController extends ConfigController {
    constructor({ apiKey, config }) {
        super();

        this._stripe = new Stripe(apiKey, config);
    }

    stripeCheckoutWebhook = async (req, res) => {
        try {
            const signature = req.headers["stripe-signature"];
            const {
                type,
                data: {
                    object: {
                        metadata: { order_id },
                        amount_total,
                    },
                },
            } = this._stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);

            if (type === "checkout.session.completed") {
                const order = await Order.findById(order_id);

                if (!order) return res.status(404).json({ message: "Заказ не найден" });

                order.status = "PAID";
                order.total_amount = amount_total;

                await order.save();

                return res.json({ message: "Заказ оплачен" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: (error instanceof Stripe.errors.StripeError && error.message) || "Во время обработки Webhook произошла ошибка",
            });
        }
    };

    createOrder = async (req, res) => {
        const token = req.headers.authorization?.split(" ")[1];

        try {
            const user = await this._getUser(token, res);
            const { cart } = await this._revalidateCart(user.cart.toObject());

            if (!cart.items.length) return res.status(400).json({ message: "Корзина пуста" });

            const order = new Order({
                cart: {
                    items: cart.items.map(({ imageUrl, title, _id, ...rest }) => rest),
                    total_price: cart.total_price,
                },
                user,
                deliveryInfo: {
                    address: "58 Middle Point Rd, 94124, San Francisco, California",
                    method: "delivery",
                    deliveryPrice: 50,
                },
                paymentInfo: { method: "card" },
            });

            const savedOrder = await order.save();
            const { _id } = savedOrder.toObject();

            res.json({ orderId: _id, message: "Заказ успешно создан" });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: (error instanceof Error && error.message) || "Во время создания заказа произошла ошибка",
            });
        }
    };

    createCheckoutSession = async (req, res) => {
        const token = req.headers.authorization?.split(" ")[1];

        try {
            const user = await this._getUser(token, res);
            const { cart } = await this._revalidateCart(user.cart.toObject());

            if (!cart.items.length) return res.status(400).json({ message: "Корзина пуста" });

            const candidate = await this._stripe.customers.search({ query: `metadata["user_id"]:"${user._id.toString()}"` });

            const customer = candidate.data[0] ?? (await this._stripe.customers.create({
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: { country: "RU" },
                metadata: { user_id: user._id.toString() } 
            }));

            const order = new Order({
                cart: {
                    items: cart.items.map(({ imageUrl, title, _id, ...rest }) => rest),
                    total_price: cart.total_price,
                },
                user,
                deliveryInfo: {
                    address: "58 Middle Point Rd, 94124, San Francisco, California",
                    method: "delivery",
                    deliveryPrice: 50,
                },
                paymentInfo: { method: "card" },
            });

            const session = await this._stripe.checkout.sessions.create({
                line_items: cart.items.map((product) => ({
                    price_data: {
                        currency: "rub",
                        unit_amount: product.price * 100,
                        product_data: {
                            name: product.title,
                            description: `${initialTypes[product.type]} тесто, ${initialSizes[product.size]} см`,
                        },
                    },
                    quantity: product.count,
                })),
                customer: customer.id,
                payment_intent_data: {
                    setup_future_usage: "off_session",
                    shipping: {
                        name: user.name,
                        address: {
                            country: "USA",
                            state: "California",
                            city: "San Francisco",
                            line1: "58 Middle Point Rd",
                            line2: "",
                            postal_code: "94124",
                        },
                    },
                },
                shipping_options: [
                    {
                        shipping_rate_data: {
                            display_name: "Доставка",
                            type: "fixed_amount",
                            fixed_amount: { amount: 50, currency: "rub" }, // amount 50 just for now. Later need take it from user.deliveryInfo.deliveryPrice
                        },
                    },
                ],
                mode: "payment",
                metadata: { user_id: user._id, order_id: order._id.toString() },
                success_url: `${process.env.FRONTEND_URL}/orders/${order._id.toString()}`,
                cancel_url: `${process.env.FRONTEND_URL}/cart`,
            });

            if (!session.url) return res.status(500).json({ message: "Во время создания сессии произошла ошибка" });

            order.checkoutSessionId = session.id;

            await order.save();

            res.json({ url: session.url });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: (error instanceof Stripe.errors.StripeError && error.message) || "Во время создания сессии произошла ошибка",
            });
        }
    };
}

export const orderController = new OrderController({ apiKey: process.env.STRIPE_SECRET });