import { NavigateFunction } from "react-router-dom";

export type DeliveryMethodType = "pickup" | "courier";

export interface Props {
    title: string;
}

export interface DeliveryMethod {
    name: string;
    component: React.ReactNode;
}

export interface initialState {
    loading: boolean;
    deliveryMethods: Array<DeliveryMethod>;
    error: unknown;
    tabIndex: number;
}

export interface DeliveryMethodModalContentProps {
    title: string;
    navigate: NavigateFunction;
}

export interface LazyErrorElementProps {
    error: unknown;
    navigate: NavigateFunction;
}

export interface DeliveryInfo {
    address: string;
    rating?: number;
    deliveryPrice?: number;
    method: DeliveryMethodType;
}