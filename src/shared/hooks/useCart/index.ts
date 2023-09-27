import React from "react";
import compareItems from "../../lib/helpers/compareItems";
import getIntlPrice from "../../lib/helpers/getIntlPrice";
import { Item } from "./interfaces";
import { AppContext } from "../../../app/context";
import { CartItem } from "../../../app/context/interfaces";
import { PizzaState } from "../../../widgets/PriceBlock/lib/utils/interfaces";

export const useCart = () => {
    const { cart, setCart } = React.useContext(AppContext);
    
    const price = React.useMemo(() => {
        const total = cart?.reduce((acc, { items }) => (acc += items.reduce((sum, { price, count }) => (sum += price * count), 0)), 0);
        const intl = getIntlPrice(total);

        return { total, intl }
    }, [cart]);

    const totalItems = React.useMemo(() => cart.reduce((acc, { items }) => acc += items.reduce((sum, { count }) => sum += count, 0) ,0), [cart])

    const addToCart = React.useCallback(({ id, category, title, imageUrl }: Item, state: PizzaState) => {
        const cartItem = cart.find(({ id: _id }) => _id === id);
        const existingIds = cartItem ? Math.max(...cartItem.items.map(({ id }) => id)) : 0; 
        const newItem: CartItem = { id: existingIds + 1, count: 1, ...state };

        if (cartItem) {
            const itemIndex = cartItem.items.findIndex((item) => compareItems(item, newItem));

            if (itemIndex !== -1) {
                setCart((prevState) =>
                    prevState.map((obj) => {
                        if (obj.id === id) {
                            return {
                                ...obj,
                                items: obj.items.map((item, index) => {
                                    if (index === itemIndex) {
                                        return {
                                            ...item,
                                            count: item.count + 1,
                                        };
                                    }
                                    return item;
                                }),
                            };
                        }
                        return obj;
                    })
                );
            } else {
                setCart((prevState) =>
                    prevState.map((obj) => {
                        if (obj.id === id) {
                            return {
                                ...obj,
                                items: [...obj.items, newItem],
                            };
                        }
                        return obj;
                    })
                );
            }
        } else {
            setCart((prevState) => [...prevState, { id, category, title, imageUrl, items: [newItem] }]);
        }
    }, [cart])

    return { addToCart, price, totalItems };
};