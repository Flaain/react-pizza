import { DeliveryInfo } from "@/pages/DeliveryMethod/model/interfaces";
import { LinkProps } from "react-router-dom";

export interface CheckoutProps {
    setPaymentModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CheckoutSummaryProps {
    setPaymentModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CheckoutControlsAuthGuardProps {
    isAgreedWithTerms: boolean;
    isOrderBtnDisabled: boolean;
    handleChangeTerms: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CheckoutInfoActionLinkProps extends LinkProps {
    deliveryInfo: DeliveryInfo;
}