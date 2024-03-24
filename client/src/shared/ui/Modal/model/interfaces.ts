export interface ModalProps {
    title?: string;
    closeHandler: () => void;
    children: React.ReactNode;
}