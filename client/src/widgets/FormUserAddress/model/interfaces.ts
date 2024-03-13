import { DeliveryInfo } from "@/pages/DeliveryMethod/model/interfaces";

export interface Props {
    setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentInfo: React.Dispatch<React.SetStateAction<DeliveryInfo | null>>
}