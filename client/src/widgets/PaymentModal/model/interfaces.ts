export type Menu = "main" | "add-card" | "choose-card";
export type PaymentMethod = "card" | "cash";
export type Menus = { [key in Menu]: { component: React.ReactNode; title: string } };

export interface Props {
    closeHandler: () => void;
}

export interface CreditCard {
    address: number;
    cvv: number;
    expiry: Date;
}

export interface PaymentInfo {
    method: PaymentMethod;
    card?: CreditCard;
}

export interface Tab {
    title: string;
    method?: PaymentMethod;
    img?: string;
    menu?: Menu;
}

export interface PaymentMainProps {
    setActiveMenu: React.Dispatch<React.SetStateAction<Menu>>;
    setCurrentInfo: React.Dispatch<React.SetStateAction<PaymentInfo | null>>;
    currentInfo: PaymentInfo | null;
    handleSave: () => void;
    closeHandler: () => void;
}

export interface PaymentMainItemProps extends Tab {
    handleChange: (menu: Menu | undefined, method: PaymentMethod | undefined) => void;
    currentInfo: PaymentInfo | null;
}

export interface ChooseCardProps extends Omit<PaymentMainProps, "setActiveMenu"> {}