import { InitialDelivery } from "../../DeliveryModal/interfaces";

export interface Props {
    items: Array<InitialDelivery>;
    indexTab: number;
    setIndexTab: React.Dispatch<React.SetStateAction<number>>;
    setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
}