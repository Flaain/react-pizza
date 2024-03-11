import { IStaicAddress, IUserAddress } from "@/shared/model/interfaces";
import { NavigateFunction } from "react-router-dom";

export type DeliveryMethodType = "pickup" | "delivery";

export interface Props {
    title: string;
}

export interface DeliveryMethod {
    title: string;
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
    address: IStaicAddress | IUserAddress;
    deliveryPrice?: number;
    method: DeliveryMethodType;
}