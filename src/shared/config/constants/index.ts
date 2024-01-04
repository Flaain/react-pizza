import { Sort } from "@/shared/model/interfaces";
import { Categories } from "@/widgets/Tools/interfaces";

export const initialTypes = ["тонкое", "традиционное"];
export const initialSizes = [25, 30, 40];
export const maxAddressLength = 200;

export const initialCategories = new Map<number | null, Categories>([
    [null, { name: "Все", categorie: null }],
    [0, { name: "Мясные", categorie: 0 }],
    [1, { name: "Вегетарианские", categorie: 1 }],
    [2, { name: "Гриль", categorie: 2 }],
    [3, { name: "Острые", categorie: 3 }],
    [4, { name: "Закрытые", categorie: 4 }],
]); // not sure about new Map, but it feels right... cuz i can use get(category) instead of .find();

export const initialSortNames = new Map<string, Sort>([
    ["title", { id: 1, name: "Алфавиту (А-Я)", sort: "title", img: "sort.svg" }],
    ["-title", { id: 2, name: "Алфавиту (Я-А)", sort: "-title", img: "sort.svg" }],
    ["rating", { id: 3, name: "Популярности", sort: "rating", img: "sort.svg" }],
    ["-rating", { id: 4, name: "Популярности", sort: "-rating", img: "sort.svg" }],
    ["price", { id: 5, name: "Цене", sort: "price", img: "sort.svg" }],
    ["-price", { id: 6, name: "Цене", sort: "-price", img: "sort.svg" }],
]); // same for this ^

export const localStorageKeys = {
    DELIVERY_INFO: "delivery-info",
    PAYMENT_INFO: "payment-info",
    DELIVERY_MODAL_INDEX: "delivery-modal-index-tab",
    USER_ADDRESSES: "user-addresses",
    USER_CARDS: "user-cards",
    CATEGORIE: "categorie-index",
    CART: "cart",
    SORT_INDEX: "sort-index",
    JWT: "token",
    TERMS: "agreed-with-terms",
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
    PRODUCT: "/product/:id",
    AUTH: "/auth",
};

export const actionTypes = {
    SET_SIZE: "SET_SIZE",
    SET_TYPE: "SET_TYPE",
    SET_PRICE: "SET_PRICE",
    UPDATE: "UPDATE",
};