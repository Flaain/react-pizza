import { DeliveryInfo } from "@/pages/DeliveryMethod/model/interfaces";
import { LinkProps } from "react-router-dom";

export interface CheckoutProps {
    handleOrder: () => void;
    setPaymentModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CheckoutSummaryProps {
    setPaymentModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
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

export interface CheckoutInfoActionLinkProps extends LinkProps {
    deliveryInfo: DeliveryInfo;
}