import jwt from "jsonwebtoken";
import { isValidObjectId } from "mongoose";
import { ConfigController } from "./ConfigController.js";
import { User } from "../models/User.js";
import { initialSizes } from "../utils/constants/initial.js";

export class CartController extends ConfigController {
    getCart = async (req, res) => {
        try {
            const revalidatedCart = await this._revalidateCart(req.body);
            res.json({ ...revalidatedCart, message: "Корзина успешно обновлена" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: (error instanceof Error && error.message) || "Во время обновления корзины произошла ошибка" });
        }
    };

    updateCart = async (req, res) => {
        const token = req.headers.authorization?.split(" ")[1];
        const cart = req.body;

        try {
            const user = await this._getUser(token);
            const { cart: { items: revalidatedCart, total_price } } = await this._revalidateCart([...cart, ...user.cart.toObject()]);

            const cartMap = new Map(revalidatedCart.map((item) => [`${item.productId}_${item.size}_${item.type}`, item]));

            user.cart = [...cartMap.values()].map(({ title, imageUrl, price, ...rest }) => rest);

            const savedUser = await user.save();
            const { cart: updatedCart } = savedUser.toObject();

            updatedCart.forEach((product) => {
                const key = `${product.productId}_${product.size}_${product.type}`;
                cartMap.set(key, { ...cartMap.get(key), _id: product._id });
            });

            res.json({ cart: { items: [...cartMap.values()], total_price }, message: "Корзина успешно обновлена" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Во время обновления корзины произошла ошибка" });
        }
    };

    removeProductFromCart = async (req, res) => {
        const token = req.headers.authorization?.split(" ")[1];
        const paramId = req.params?.id;

        if (!token || !isValidObjectId(paramId)) return res.status(403).json({ message: "Доступ запрещен" });

        try {
            const user = await this._getUser(token);

            user.cart = user.cart.filter(({ _id }) => _id.toString() !== paramId);

            const savedUser = await user.save();
            const { cart } = savedUser.toObject();

            res.json({ cart, message: "Продукт успешно удален из корзины" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Во время удаления продукта из корзины произошла ошибка" });
        }
    };

    changeQuantity = async (req, res) => {
        const token = req.headers.authorization?.split(" ")[1];
        const paramId = req.params?.id;

        const { action, value } = req.body;

        if (!token || !isValidObjectId(paramId)) return res.status(403).json({ message: "Доступ запрещен" });

        try {
            const actions = {
                increment: (count) => count + 1,
                decrement: (count) => count - 1,
            };

            const user = await this._getUser(token);

            user.cart = user.cart.map((product) => {
                if (product._id.toString() === paramId) {
                    return {
                        ...product,
                        count: action === "direct" ? value : actions[action](product.count),
                    };
                }

                return product;
            });

            const savedUser = await user.save();
            const { cart } = savedUser.toObject();
            
            res.json({ cart, message: "Количество успешно изменено" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error instanceof Error && error.message || "Во время изменения количества произошла ошибка" });
        }
    };

    addToCart = async (req, res) => {
        const token = req.headers.authorization?.split(" ")[1];
        const product = req.body;

        if (!token) return res.status(403).json({ message: "Доступ запрещен" });

        try {
            const response = await fetch(process.env.MOKKY + `/products?id=${product.productId}`);
            const { 0: actualProduct } = await response.json();

            if (!actualProduct) return res.status(404).json({ message: `Продукт с указанным (${product.productId}) id не найден` });

            if (!actualProduct.sizes.some(({ size }) => size === initialSizes[product.size]) || !actualProduct.types.some((type) => type === product.type)) {
                return res.status(404).json({ message: "Продукт с указанными параметрами не найден", params: product}) 
            };

            const user = await this._getUser(token);
            
            const cartMap = new Map(user.cart.toObject().map((item) => [`${item.productId}_${item.size}_${item.type}`, item]));
            const candidateKey = `${product.productId}_${product.size}_${product.type}`;
            const candidate = cartMap.get(candidateKey);

            cartMap.set(candidateKey, candidate ? { ...candidate, count: candidate.count + 1 } : { ...product, count: 1 });

            user.cart = [...cartMap.values()];

            const savedUser = await user.save();
            const { cart } = savedUser.toObject();

            const cartRes = await fetch(process.env.MOKKY + `/products?id[]=${cart.map((item) => item.productId).join("&id[]=")}`);
            const actualProducts = await cartRes.json();

            const updatedCart = cart.reduce((acc, product) => {
                const cartItem = actualProducts.find((actualProduct) => actualProduct.id === product.productId);
                const price = cartItem.sizes.find(({ size }) => size === initialSizes[product.size]).price;

                return {
                    ...acc,
                    cart: {
                        ...acc.cart,
                        items: [ ...acc.cart.items, { ...product, imageUrl: cartItem.imageUrl, title: cartItem.title, price } ],
                        total_price: acc.cart.total_price + price * product.count,
                    },
                };
            }, { cart: { items: [], total_price: 0 } });

            res.json({ ...updatedCart, message: "Продукт успешно добавлен в корзину" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Во время добавления продукта в корзину произошла ошибка" });
        }
    };

    clearCart = async (req, res) => {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) return res.status(403).json({ message: "Доступ запрещен" });

        try {
            const { id } = jwt.verify(token, process.env.JWT_SECRET);

            if (!isValidObjectId(id)) return res.status(403).json({ message: "Доступ запрещен" });

            await User.findOneAndUpdate({ _id: id }, { $set: { cart: [] } });

            res.json({ message: "Корзина успешно очищена" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Во время очистки корзины произошла ошибка" });
        }
    };
}

export const cartController = new CartController();