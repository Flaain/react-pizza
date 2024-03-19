const formatPrice = (
    price: number,
    locale = navigator.language,
    options = {
        currency: "RUB",
        style: "currency",
        maximumFractionDigits: 0,
    }
): string => new Intl.NumberFormat(locale, options).format(price);

export default formatPrice;
