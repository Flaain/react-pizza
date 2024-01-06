export interface Props {
    callToActionReason: boolean;
    callToActionText: string;
    item: JSX.Element;
    disabled: boolean;
    title: string;
    updater: () => void;
}