export interface CallToActionBlockProps {
    title: string;
    reason: boolean;
    action?: () => void;
    reasonText?: string;
    as?: React.ElementType;
    component: React.ReactNode;
}