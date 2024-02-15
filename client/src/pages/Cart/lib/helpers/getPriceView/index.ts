import { CartItem } from "@/pages/Cart/model/interfaces";
import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";
import { CartItemLocal } from "@/shared/model/interfaces";

const getPriceView = (cart: Array<CartItem>) => {
    const totalPrice = cart?.reduce((acc, { count, price }) => acc += count * price, 0);
    const totalItems = cart.reduce((acc, { count }) => acc + count, 0);
    const intl = getIntlPrice(totalPrice);

    return { totalPrice, totalItems, intl };
};

export default getPriceView;