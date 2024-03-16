export type PaymentMethod = "card" | "cash";
export type PaymentInfo = { method: PaymentMethod };

export interface Props {
    closeHandler: () => void;
}

export interface Tab {
    title: string;
    method: PaymentMethod;
    img?: string;
}

export interface PaymentMainProps {
    setCurrentInfo: React.Dispatch<React.SetStateAction<PaymentInfo | null>>;
    currentInfo: PaymentInfo | null;
}