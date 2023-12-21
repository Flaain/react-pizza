import { DeliveryInfo } from "@/pages/Cart";
import { DeliveryMethod } from "@/pages/DeliveryMethod/model/interfaces";

export interface TabSelectorProps {
    items: Array<DeliveryMethod>;
    tabIndex: number;
    setTabIndex: React.Dispatch<React.SetStateAction<number>>;
}

export interface TabContentProps {
    activeTab: DeliveryMethod;
    isSaveBtnDisabled: boolean;
    handleChange: ({ address, method, deliveryPrice, rating }: DeliveryInfo) => void;
    handleSave: () => void;
    currentInfo: DeliveryInfo | null;
    setCurrentInfo: React.Dispatch<React.SetStateAction<DeliveryInfo | null>>;
}

export interface TabItemProps {
    address: string;
    method: string;
    currentInfo: DeliveryInfo | null;
    rating?: number;
    deliveryPrice?: number;
    handleChange: ({ address, deliveryPrice, method, rating }: DeliveryInfo) => void;
}

export interface TabContentListProps {
    activeTab: DeliveryMethod;
    currentInfo: DeliveryInfo | null;
    handleChange: ({ address, deliveryPrice, method, rating }: DeliveryInfo) => void;
}