import { CartInterface } from "@/pages/Cart";
import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";

const getPriceView = (cart: Array<CartInterface>) => {
    const total = cart?.reduce((acc, { items }) => (acc += items.reduce((sum, { price, count }) => (sum += price * count), 0)), 0);
    const intl = getIntlPrice(total);
    const totalItems = cart.reduce((acc, { items }) => (acc += items.reduce((sum, { count }) => (sum += count), 0)), 0);

    return { total, intl, totalItems };
};

export default getPriceView;