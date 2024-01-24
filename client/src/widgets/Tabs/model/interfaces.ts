import { DeliveryInfo, DeliveryMethod, DeliveryMethodType } from "@/pages/DeliveryMethod/model/interfaces";
import { Address } from "@/shared/model/interfaces";
import { NavigateFunction, SetURLSearchParams } from "react-router-dom";

export interface TabSelectorProps {
    items: Array<DeliveryMethod>;
    selectedDeliveryMethodIndex: number;
    setSelectedDeliveryMethodIndex: React.Dispatch<React.SetStateAction<number>>;
    setSearchParams: SetURLSearchParams;
}

export interface TabContentProps {
    method: DeliveryMethodType;
    handleChange: ({ address, method, deliveryPrice, rating }: DeliveryInfo) => void;
    handleSave: () => void;
    currentInfo: DeliveryInfo | null;
}

export interface TabItemProps {
    address: string;
    method: DeliveryMethodType;
    currentInfo: DeliveryInfo | null;
    rating?: number;
    deliveryPrice?: number;
    handleChange: ({ address, deliveryPrice, method, rating }: DeliveryInfo) => void;
}

export interface TabContentListProps {
    elements: Array<Address>;
    method: DeliveryMethodType;
    currentInfo: DeliveryInfo | null;
    handleChange: ({ address, deliveryPrice, method, rating }: DeliveryInfo) => void;
}

export interface EmptyUserAddressesProps {
    navigate: NavigateFunction;
    setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
}