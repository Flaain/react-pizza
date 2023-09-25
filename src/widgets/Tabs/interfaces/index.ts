import { InitialDelivery } from "../../../features/DeliveryModal/interfaces";
import { DeliveryInfo } from "../../../pages/Cart/interfaces";

export interface Props {
    items: Array<InitialDelivery>;
    currentInfo: DeliveryInfo;
    setInitialDelivery: React.Dispatch<React.SetStateAction<Array<InitialDelivery>>>;
}