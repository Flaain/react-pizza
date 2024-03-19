import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { isValidObjectId } from "mongoose";
import { initialSizes } from "../utils/constants/initial.js";

export class ConfigController {
    _revalidateCart = async (cart = []) => {
        try {
            const response = await fetch(process.env.MOKKY + `/products?id[]=${cart.map((item) => item.productId).join("&id[]=")}`);
            const actualProducts = await response.json();

            const revalidatedCart = [...new Map(cart.map((item) => [`${item.productId}_${item.size}_${item.type}`, item])).values()].reduce((acc, { _id, ...product }) => {
                    const cartItem = actualProducts.find((actualProduct) => actualProduct.id === product.productId);

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
                                    ...(isValidObjectId(_id) && { _id }),
                                    productId: cartItem.id,
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
        } catch (error) {
            console.log(error);
        }
    };

    _getUser = async (token) => {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        if (!isValidObjectId(id)) throw new Error("Доступ запрещен");

        const user = await User.findById(id);

        if (!user) throw new Error("Пользователь не найден");

        return user;
    };

    _revalidatePickupPoint = async (id) => {
        const response = await fetch(process.env.MOKKY + `/addresses?id=${id}`);
        const actualAddress = await response.json();

        return actualAddress;
    };

    _getDeliveryInfo = async ({ id, method, user, throwError = true }) => {
        if (!id || !method) throw new Error("Необходимо передать id и метод доставки");

        const actions = {
            pickup: async () => {
                const { 0: revalidatedPickupPoint } = await this._revalidatePickupPoint(id);

                if (!revalidatedPickupPoint) {
                    if (throwError) throw new Error("Пункт самовывоза не найден");
                    return null;
                }

                return { address: revalidatedPickupPoint, method };
            },
            delivery: async () => {
                const userAddress = user.addresses.find(({ _id }) => _id.toString() === id);

                if (!userAddress) {
                    if (throwError) throw new Error("Адрес не найден");
                    return null;
                }
                const { _id, ...address } = userAddress.toObject();

                return {
                    method,
                    address: { id: _id, ...address },
                    deliveryPrice: Math.floor(Math.random() * (500 - 300 + 1)) + 300,
                };
            },
        };

        const address = await actions[method]();

        return address;
    };
}