import React from "react";
import { DeliveryModalContext as DMC, PaymentModalContext as PMC } from "./interfaces";

export const DeliveryModalContext = React.createContext<DMC>({
    currentInfo: null,
    deliveryInfo: null,
    initialDelivery: [],
    setCurrentInfo: () => new Error("Function not implemented."),
    setDeliveryInfo: () => new Error("Function not implemented."),
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