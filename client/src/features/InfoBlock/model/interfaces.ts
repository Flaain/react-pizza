export interface Props {
    callToActionReason: boolean;
    callToActionText: string;
    item: JSX.Element;
    title: string;
    updater?: () => void;
}