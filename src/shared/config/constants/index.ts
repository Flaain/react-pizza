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
        id: 1,
        name: "Алфавиту (А-Я)",
        sort: "title",
        img: "sort.svg",
    },
    {
        id: 2,
        name: "Алфавиту (Я-А)",
        sort: "-title",
        img: "sort.svg",
    },
    {
        id: 3,
        name: "Популярности",
        sort: "rating",
        img: "sort.svg",
    },
    {
        id: 4,
        name: "Популярности",
        sort: "-rating",
        img: "sort.svg",
    },
    {
        id: 5,
        name: "Цене",
        sort: "price",
        img: "sort.svg",
    },
    {
        id: 6,
        name: "Цене",
        sort: "-price",
        img: "sort.svg",
    },
];

export const INITIAL_VIEW = 6;

export const localStorageKeys = {
    DELIVERY_INFO_KEY: "delivery-info",
    PAYMENT_INFO_KEY: "payment-info",
    DELIVERY_MODAL_INDEX_KEY: "delivery-modal-index-tab",
    USER_ADDRESSES_KEY: "user-addresses",
    USER_CARDS_KEY: "user-cards",
    CATEGORIE_KEY: "categorie-index",
    CART_KEY: "cart",
    SORT_INDEX_KEY: "sort-index",
};

export const routerList = {
    NOT_FOUND: "*",
    HOME: "/",
    CART: {
        main: "/cart",
        children: {
            DELIVERY_METHOD: "delivery-method",
        },
    },
};