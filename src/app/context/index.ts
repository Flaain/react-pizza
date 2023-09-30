import React from "react";
import {
    CartContext as CC,
    AppContext as Context,
    DeliveryModalContext as DMC,
    PaymentModalContext as PMC,
} from "./interfaces";

export const AppContext = React.createContext<Context>({
    pizzas: [],
    searchValue: '',
    searchParams: new URLSearchParams(),
    filteredPizzas: [],
    cart: [],
    loading: true,
    errorData: null,
    setSearchParams: () => new Error("Function not implemented."),
    setPizzas: () => new Error("Function not implemented."),
    setSearchValue: () => new Error("Function not implemented."),
    setFilteredPizzas: () => new Error("Function not implemented."),
    setCart: () => new Error("Function not implemented."),
});

export const DeliveryModalContext = React.createContext<DMC>({
    currentInfo: null,
    deliveryInfo: null,
    initialDelivery: [],
    setCurrentInfo: () => new Error("Function not implemented."),
    setDeliveryInfo: () => new Error("Function not implemented."),
    setDeliveryModalOpened: () => new Error("Function not implemented."),
    setInitialDelivery: () => new Error("Function not implemented."),
});

export const PaymentModalContext = React.createContext<PMC>({
    setActiveMenu: () => new Error("Function not implemented."),
    setCurrentInfo: () => new Error("Function not implemented."),
    setUserCards: () => new Error("Function not implemented."),
    handleSave: () => new Error("Function not implemented."),
    userCards: [],
    currentInfo: null,
    paymentInfo: null,
    activeMenu: "main",
    menus: {
        main: { component: null!, title: "" },
        "add-card": { component: null!, title: "" },
        "choose-card": { component: null!, title: "" },
    },
});

export const CartContext = React.createContext<CC>({
    orderLoading: false,
    deliveryInfo: null,
    paymentInfo: null,
    minimizeCartItems: false,
    promocodes: [],
    setDeliveryInfo: () => new Error("Function not implemented."),
    setDeliveryModalOpened: () => new Error("Function not implemented."),
    setPaymentInfo: () => new Error("Function not implemented."),
    setPaymentInfoModalOpened: () => new Error("Function not implemented."),
    setMinimizeCartItems: () => new Error("Function not implemented."),
});