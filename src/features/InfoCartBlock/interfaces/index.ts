import { DeliveryInfo, PaymentInfo } from "../../../pages/Cart/interfaces";

export interface Props {
    callToActionReason: DeliveryInfo | PaymentInfo;
    callToActionText: string;
    callToActionItem: JSX.Element;
    disabled: boolean;
    title: string;
    stateUpdater?: React.Dispatch<React.SetStateAction<boolean>>;
    paramsUpdater?: () => void;
}