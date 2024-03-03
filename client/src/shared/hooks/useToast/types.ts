export type ToastType = 'normal' | 'action' | 'success' | 'info' | 'warning' | 'error' | 'default';

export interface IExternalToast extends Partial<Omit<IToast, "title" | "type">> {}

export interface IToast {
    id: number | string;
    type?: ToastType;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    duration: number;
    onAutoClose?: (toast: Pick<IToast, "id" | "type" | "title" | "description">) => void;
    onClose?: (toast: Pick<IToast, "id" | "type" | "title" | "description">) => void;
    closeButton?: boolean;
    autoClose?: boolean;
}

export interface IHeights {
    id: number | string;
    height: number;
}

export interface IToastProps extends IToast {
    toasts: Array<IToast>;
    recalculateRemainingTime?: boolean;
    setHeights: React.Dispatch<React.SetStateAction<IHeights[]>>;
    removeToast: (id: number | string) => void;
    autoClose?: boolean;
    index: number;
    heights: Array<IHeights>;
    expanded: boolean;
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}