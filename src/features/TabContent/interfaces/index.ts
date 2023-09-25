import { DeliveryInfo } from "../../../pages/Cart/interfaces";
import { InitialDelivery } from "../../DeliveryModal/interfaces";

export interface Props {
    activeTab: InitialDelivery;
    indexTab: number;
    currentInfo: DeliveryInfo | null;
    deliveryInfo: DeliveryInfo | null;
    setCurrentInfo: React.Dispatch<React.SetStateAction<DeliveryInfo | null>>;
    setDeliveryInfo: React.Dispatch<React.SetStateAction<DeliveryInfo | null>>;
}