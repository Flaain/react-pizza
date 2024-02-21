import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { isValidObjectId } from "mongoose";
import { initialSizes } from "../utils/constants/initial.js";

export class ConfigController {
    _revalidateCart = async (cart = []) => {
        const response = await fetch(process.env.MOKKY + `/products?id[]=${cart.map((item) => item.id).join("&id[]=")}`);
        const actualProducts = await response.json();

        const revalidatedCart = cart.reduce((acc, product) => {
            const cartItem = actualProducts.find((actualProduct) => actualProduct.id === product.id);

            if (!cartItem) return acc;
            // throw new Error(`Не удалось найти продукт с id - ${item.id}`);

            const size = cartItem.sizes.find(({ size }) => size === initialSizes[product.size]);
            const price = size?.price ?? cartItem.sizes[0].price;
            const count = Math.min(Math.max(product.count, 1), 10);
            const type = cartItem.types.find((type) => type === product.type);

            return {
                ...acc,
                cart: {
                    ...acc.cart,
                    items: [
                        ...acc.cart.items,
                        {
                            ...product,
                            id: cartItem.id,
                            imageUrl: cartItem.imageUrl,
                            title: cartItem.title,
                            type: type ?? cartItem.types[0],
                            size: size ? product.size : initialSizes.findIndex((size) => size === cartItem.sizes[0].size),
                            count,
                            price,
                        },
                    ],
                    total_price: acc.cart.total_price + price * count,
                },
            };
        }, { cart: { items: [], total_price: 0 } });

        return revalidatedCart;
    };

    _getUser = async (token, res) => {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        if (!isValidObjectId(id)) return res.status(403).json({ message: "Доступ запрещен" });

        const currentUser = await User.findById(id);

        if (!currentUser) return res.status(404).json({ message: "Пользователь не найден" });
        
        return currentUser;
    };
}