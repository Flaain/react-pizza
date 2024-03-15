import { Address } from "@/shared/model/interfaces";

export type DeliveryMethodType = "pickup" | "delivery";

export interface DeliveryMethodProps {
    title: string;
}

export interface DeliveryMethod {
    title: string;
    component: React.ReactNode;
}

export interface DeliveryInfo {
    address: Address;
    deliveryPrice?: number;
    method: DeliveryMethodType;
}

export interface MethodListProps {
    currentInfo: DeliveryInfo | null;
    addresses: Array<Address>;
    method: DeliveryMethodType;
    handleAddressChange: (info: Omit<DeliveryInfo, "method">) => void;
}

export interface MethodItemProps extends React.HTMLAttributes<HTMLLIElement> {
    address: Address;
    currentInfo: DeliveryInfo | null;
    method: DeliveryMethodType;
    handleAddressChange: (info: Omit<DeliveryInfo, "method">) => void;
}

export interface MethodControlsProps {
    method: DeliveryMethodType;
    onSave: () => void;
    onCancel: () => void;
    onShowForm: () => void;
    hasAddresses: boolean;
    isSaveBtnDisabled: boolean;
}

export interface MethodTabContentProps {
    method: DeliveryMethodType;
    addresses: Array<Address>;
    currentInfo: DeliveryInfo | null;
    handleSave: () => void;
    handleAddressChange: (info: Omit<DeliveryInfo, "method">) => void;
    isSaveBtnDisabled: boolean;
}