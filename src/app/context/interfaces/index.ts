import React from "react";
import { Order } from "../../../shared/api/interfaces";
import { CreditCard, DeliveryInfo, PaymentInfo, Promocode } from "../../../pages/Cart/interfaces";
import { InitialDelivery } from "../../../features/DeliveryModal/interfaces";
import { AvaiblePaymentMenus } from "../types";
import { Menus } from "../../../entities/PaymentInfoModal/interfaces";

export interface Error {
    status: number;
    text: string;
    message: string;
}

export interface DeliveryModalContext {
    currentInfo: DeliveryInfo | null;
    deliveryInfo: DeliveryInfo | null;
    setCurrentInfo: React.Dispatch<React.SetStateAction<DeliveryInfo | null>>;
    initialDelivery: Array<InitialDelivery>;
    setInitialDelivery: React.Dispatch<React.SetStateAction<Array<InitialDelivery>>>;
    setDeliveryInfo: React.Dispatch<React.SetStateAction<DeliveryInfo | null>>;
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
    setMinimizeCartItems: React.Dispatch<React.SetStateAction<boolean>>;
    setPaymentInfoModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
    setOrdered?: React.Dispatch<React.SetStateAction<boolean>>;
    setOrderLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}