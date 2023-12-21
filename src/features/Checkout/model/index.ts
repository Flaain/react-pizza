import { DeliveryInfo } from "@/pages/Cart";
import { PaymentInfo } from "@/pages/Cart/model/interfaces";

export interface CheckoutProps {
    handleOrder: () => void;
    setPaymentInfoModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CheckoutSummaryProps {
    deliveryInfo: DeliveryInfo;
    paymentInfo: PaymentInfo;
    intl: string;
}

export interface CheckoutTotalProps {
    handleOrder: () => void;
}

export interface CheckoutControlsProps {
    handleOrder: () => void;
}

export interface CheckoutControlsAuthGuardProps {
    handleOrder: () => void;
    isAgreedWithTerms: boolean;
    isOrderBtnDisabled: boolean;
    handleChangeTerms: (event: React.ChangeEvent<HTMLInputElement>) => void;
}