import Stripe from "stripe";
import { BaseController } from "./BaseController.js";
import { initialSizes, initialTypes } from "../utils/constants/initial.js";
import { Order } from "../models/Order.js";
import { User } from "../models/User.js";

class OrderController extends BaseController {
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
                        metadata: { order_id, user_id },
                        amount_total,
                    },
                },
            } = this._stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);

            if (type === "checkout.session.completed") {
                const order = await Order.findById(order_id);
                const user = await User.findById(user_id);
                
                if (!order || !user) return res.status(404).json({ message: "Заказ не найден" });
                
                order.status = "PAID";
                order.total_amount = amount_total;
                user.cart = [];

                await user.save();
                await order.save();

                return res.json({ message: "Заказ оплачен" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message || "Во время обработки Webhook произошла ошибка" });
        }
    };

    createOrder = async (req, res) => {
        const token = req.headers.authorization?.split(" ")[1];

        try {
            const user = await this._getUser(token, res);
            const { cart } = await this._revalidateCart(user.cart.toObject());

            if (!cart.items.length) return res.status(400).json({ message: "Корзина пуста" });

            const { 
                address: { id, rating, ...address }, 
                deliveryPrice 
            } = await this._getDeliveryInfo({ id: user.deliveryInfo.id, method: user.deliveryInfo.method, user });
            
            const order = new Order({
                cart: { items: cart.items.map(({ _id, ...rest }) => rest), total_price: cart.total_price },
                deliveryInfo: { address, deliveryPrice },
                paymentInfo: { method: "cash" },
                user,
            });

            const savedOrder = await order.save();
            const { _id } = savedOrder.toObject();
            
            const orders = await Order.find({ user: user._id }).lean();

            const extraInfo = orders.reduce((acc, order) => {
                const isPayed = order.status === "PAID";
                const totalOrdersPrice = acc.totalOrdersPrice + order.cart.total_price;
                const purchaseAmount = acc.purchaseAmount + (isPayed ? (order.total_amount / 100) : 0);
                const purchasePercent = (purchaseAmount / totalOrdersPrice) * 100;
            
                return {
                    ...acc,
                    totalItemsCount: acc.totalItemsCount + order.cart.items.length,
                    purchasePercent,
                    purchaseAmount,
                    totalOrdersPrice,
                };
            }, { totalItemsCount: 0, totalOrdersPrice: 0, purchaseAmount: 0, purchasePercent: 0 });

            res.json({ 
                orderId: _id, 
                extraInfo: {
                    ...extraInfo,
                    ordersGoods: orders.flatMap(({ cart: { items } }) => items.map((item) => ({ id: item._id, src: item.imageUrl }))).reverse().slice(0, 5),
                    ordersCount: orders.length
                }, 
                message: "Заказ успешно создан" 
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message || "Во время создания заказа произошла ошибка" });
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
                metadata: { user_id: user._id.toString() },
            }));

            const { 
                address: { id, rating, ...address }, 
                deliveryPrice 
            } = await this._getDeliveryInfo({ id: user.deliveryInfo.id, method: user.deliveryInfo.method, user });

            const order = new Order({
                cart: { items: cart.items.map(({ _id, ...rest }) => rest), total_price: cart.total_price },
                deliveryInfo: { address, deliveryPrice },
                paymentInfo: { method: "card" },
                user,
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
                            country: "RU",
                            city: address.city,
                            line1: address.line,
                            postal_code: address.postal_code,
                            state: address.state
                         },
                    },
                },
                shipping_options: [
                    {
                        shipping_rate_data: {
                            display_name: "Доставка",
                            type: "fixed_amount",
                            fixed_amount: { amount: deliveryPrice ? deliveryPrice * 100 : 0, currency: "rub" },
                        },
                    },
                ],
                mode: "payment",
                metadata: { user_id: user._id.toString(), order_id: order._id.toString() },
                success_url: `${process.env.FRONTEND_URL}/lk/orders`,
                cancel_url: `${process.env.FRONTEND_URL}/cart`,
            });

            if (!session.url) return res.status(500).json({ message: "Во время создания сессии произошла ошибка" });

            order.checkoutSessionId = session.id;

            await order.save();

            res.json({ url: session.url });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message || "Во время создания сессии произошла ошибка" });
        }
    };

    getOrders = async (req, res) => {
        const token = req.headers.authorization?.split(" ")[1];

        try {
            const user = await this._getUser(token, res);
            const orders = await Order.find({ user: user._id }).lean();

            res.json({ orders });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message || "Во время получения заказов произошла ошибка" });
        }
    }
}

export const orderController = new OrderController({ apiKey: process.env.STRIPE_SECRET });