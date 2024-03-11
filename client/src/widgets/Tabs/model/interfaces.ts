import { DeliveryInfo, DeliveryMethod, DeliveryMethodType } from "@/pages/DeliveryMethod/model/interfaces";
import { IStaicAddress, IUserAddress } from "@/shared/model/interfaces";
import { NavigateFunction, SetURLSearchParams } from "react-router-dom";

export interface TabSelectorProps {
    items: Array<DeliveryMethod>;
    selectedDeliveryMethodIndex: number;
    setSelectedDeliveryMethodIndex: React.Dispatch<React.SetStateAction<number>>;
    setSearchParams: SetURLSearchParams;
}

export interface Address {
    line: string;
    city: string;
    state: string;
    postal_code: string;
}

export interface TabContentProps {
    method: DeliveryMethodType;
    handleChange: ({ address, method, deliveryPrice }: DeliveryInfo) => void;
    handleSave: () => void;
    currentInfo: DeliveryInfo | null;
}

export interface TabItemProps {
    address: IStaicAddress | IUserAddress;
    method: DeliveryMethodType;
    currentInfo: DeliveryInfo | null;
    handleChange: ({ address, method }: DeliveryInfo) => void;
}

export interface TabContentListProps {
    elements: Array<IStaicAddress | IUserAddress>;
    method: DeliveryMethodType;
    currentInfo: DeliveryInfo | null;
    handleChange: ({ address, method }: DeliveryInfo) => void;
}

export interface EmptyUserAddressesProps {
    navigate: NavigateFunction;
    setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
}