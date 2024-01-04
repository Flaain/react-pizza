import { PaymentInfo } from "@/pages/Cart";
import { Menu, PaymentMethod } from "@/widgets/PaymentModal/model/interfaces";

export interface Tab {
    title: string;
    method?: PaymentMethod;
    img?: string;
    menu?: Menu
}

export interface Props {
    setActiveMenu: React.Dispatch<React.SetStateAction<Menu>>;
    setCurrentInfo: React.Dispatch<React.SetStateAction<PaymentInfo | null>>;
    currentInfo: PaymentInfo | null;
    handleSave: () => void;
    closeHandler: () => void;
}