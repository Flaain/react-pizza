export const initialTypes = ["тонкое", "традиционное"];
export const initialSizes = [
    { size: 25, additional: 0 },
    { size: 30, additional: 120 },
    { size: 40, additional: 200 },
];

export const initialCategories = [
    { name: "Все" },
    { name: "Мясные", categorie: 0 },
    { name: "Вегетарианские", categorie: 1 },
    { name: "Гриль", categorie: 2 },
    { name: "Острые", categorie: 3 },
    { name: "Закрытые", categorie: 4 },
];

export const initialSortNames = [
    {
        name: "Популярности",
        sort: "rating",
    },
    {
        name: "Цене ( возрастание )",
        sort: "price",
    },
    {
        name: "Цене ( убывание )",
        sort: "-price",
    },
];

export const DELIVERY_INFO_KEY = "delivery-info";
export const PAYMENT_INFO_KEY = "payment-info";
export const DELIVERY_MODAL_INDEX_KEY = "delivery-modal-index-tab";
export const USER_ADDRESSES_KEY = "user-addresses";
export const USER_CARDS_KEY = "user-cards";
export const CATEGORIE_KEY = "categorie-index";
export const CART_KEY = "cart";
export const SORT_INDEX_KEY = "sort-index";