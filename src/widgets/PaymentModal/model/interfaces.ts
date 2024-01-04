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