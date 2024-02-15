import { initialTypes } from "../utils/constants/initial.js";

export class CartController {
    static async getCart(req, res) {
        try {
            const cart = req.body?.cart;

            if (!cart) return res.status(401).json({ message: "Корзина пуста" });

            const response = await fetch(
                process.env.MOKKY + `/products?id[]=${cart.map((item) => item.id).join("&id[]=")}`
            );
            const items = await response.json();

            const revolidatedCart = cart.map((item) => {
                const cartItem = items.find((cartItem) => cartItem.id === item.id);

                if (!cartItem) throw new Error(`Не удалось найти продукт с id - ${item.id}`);

                const size = cartItem.sizes[item.size]?.size ? item.size : 0;

                return {
                    id: item.id,
                    count: item.count <= 0 ? 1 : item.count,
                    imageUrl: cartItem.imageUrl,
                    title: cartItem.title,
                    size,
                    type: initialTypes[item.type] ? item.type : 0,
                    price: cartItem.sizes[size]?.price,
                };
            });

            res.json({ cart: revolidatedCart, message: "Корзина успешно обновлена" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Во время обновления корзины произошла ошибка" });
        }
    }
}