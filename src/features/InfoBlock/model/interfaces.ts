export interface Props {
    callToActionReason: boolean;
    callToActionText: string;
    callToActionItem: JSX.Element;
    disabled: boolean;
    title: string;
    updater: () => void;
}