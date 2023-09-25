import { DeliveryInfo, PaymentInfo } from "../../../pages/Cart/interfaces";

export interface Props {
    callToActionReason: DeliveryInfo | PaymentInfo;
    callToActionText: string;
    callToActionItem: JSX.Element;
    updater: React.Dispatch<React.SetStateAction<boolean>>;
    disabled: boolean;
    title: string;
}