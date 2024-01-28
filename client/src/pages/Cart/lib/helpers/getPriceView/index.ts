import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";
import { CartInterface } from "@/pages/Cart";

const getPriceView = (cart: Array<CartInterface>) => {
    const totalPrice = cart?.reduce((acc, { count, price }) => acc += count * price, 0);
    const totalItems = cart.reduce((acc, { count }) => acc + count, 0);
    const intl = getIntlPrice(totalPrice);

    return { totalPrice, totalItems, intl };
};

export default getPriceView;