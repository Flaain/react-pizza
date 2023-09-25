import { DeliveryInfo } from "../../../pages/Cart/interfaces";
import { InitialDelivery } from "../../DeliveryModal/interfaces";

export interface Props {
    address: string;
    currentInfo: DeliveryInfo | null;
    deliveryInfo: DeliveryInfo | null;
    setCurrentInfo: React.Dispatch<React.SetStateAction<DeliveryInfo | null>>;
    setDeliveryInfo: React.Dispatch<React.SetStateAction<DeliveryInfo | null>>;
    rating?: number;
    indexTab: number;
    deliveryPrice?: number;
    activeTab: InitialDelivery;
    handleChange: (address: string, rating: number | undefined, deliveryPrice: number | undefined) => void;
}