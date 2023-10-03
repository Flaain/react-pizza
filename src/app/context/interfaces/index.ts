import React from "react";
import { Order, Pizza } from "../../../shared/api/interfaces";
import { CreditCard, DeliveryInfo, PaymentInfo, Promocode } from "../../../pages/Cart/interfaces";
import { InitialDelivery } from "../../../features/DeliveryModal/interfaces";
import { AvaiblePaymentMenus } from "../types";
import { Menus } from "../../../entities/PaymentInfoModal/interfaces";
import { SetURLSearchParams } from "react-router-dom";

export interface Cart {
    id: number;
    category: number;
    title: string;
    imageUrl: string;
    items: CartItem[];
}

export interface CartItem {
    id: number;
    size: number;
    type: number;
    price: number;
    count: number;
}

export interface Error {
    status: number;
    text: string;
    message: string;
}

export interface AppContext {
    pizzas: Pizza[];
    cart: Cart[];
    loading: boolean;
    searchParams: URLSearchParams;
    errorData: Error | null | unknown;
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    setSearchParams: SetURLSearchParams;
    setPizzas: React.Dispatch<React.SetStateAction<Pizza[]>>;
    setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
}

export interface DeliveryModalContext {
    currentInfo: DeliveryInfo | null;
    deliveryInfo: DeliveryInfo | null;
    setCurrentInfo: React.Dispatch<React.SetStateAction<DeliveryInfo | null>>;
    initialDelivery: Array<InitialDelivery>;
    setInitialDelivery: React.Dispatch<React.SetStateAction<Array<InitialDelivery>>>;
    setDeliveryInfo: React.Dispatch<React.SetStateAction<DeliveryInfo | null>>;
    setDeliveryModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ActiveCard {
    card: number;
    expiry: Date;
    cvv: number;
}

export interface PaymentModalContext {
    setActiveMenu: React.Dispatch<React.SetStateAction<AvaiblePaymentMenus>>;
    setUserCards: React.Dispatch<React.SetStateAction<Array<CreditCard>>>;
    setCurrentInfo: React.Dispatch<React.SetStateAction<PaymentInfo | null>>;
    handleSave: () => void;
    currentInfo: PaymentInfo | null;
    paymentInfo: PaymentInfo | null;
    userCards: Array<CreditCard>;
    activeMenu: AvaiblePaymentMenus;
    menus: Menus;
}

export interface CartContext {
    orderLoading: boolean;
    ordered?: boolean;
    deliveryInfo: DeliveryInfo | null;
    paymentInfo: PaymentInfo | null;
    orderData?: Order | null;
    promocodes: Array<Promocode>;
    deliveryModalOpened?: boolean;
    paymentInfoModalOpened?: boolean;
    minimizeCartItems: boolean;
    setDeliveryInfo: React.Dispatch<React.SetStateAction<DeliveryInfo | null>>;
    setPaymentInfo: React.Dispatch<React.SetStateAction<PaymentInfo | null>>;
    setOrderData?: React.Dispatch<React.SetStateAction<Order | null>>;
    setDeliveryModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
    setMinimizeCartItems: React.Dispatch<React.SetStateAction<boolean>>;
    setPaymentInfoModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
    setOrdered?: React.Dispatch<React.SetStateAction<boolean>>;
    setOrderLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface HomeContext {
    selectedSortIndex: number;
    selectedCategorieIndex: number | null;
    view: number;
}