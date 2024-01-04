import { Address } from "@/shared/model/interfaces";
import { TabContentProps } from "@/widgets/Tabs/model/interfaces";
import { NavigateFunction } from "react-router-dom";

export type DeliveryMethodType = "pickup" | "courier";

export interface Props {
    title: string;
}

export interface DeliveryMethod {
    name: string;
    addresses: Array<Address>;
    method: DeliveryMethodType;
    component: React.ComponentType<TabContentProps>;
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
    method: DeliveryMethod;
}