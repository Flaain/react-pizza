import React from "react";
import { uuidv4 } from "./custom.uuidv4";
import { IExternalToast, IHeights, IToast } from "./types";

const DEFAULT_TOAST_DURATION = 4000;
const MAX_TOASTS = 3;

export const useToast = () => {
    const [toasts, setToasts] = React.useState<Array<IToast>>([]);
    const [heights, setHeights] = React.useState<Array<IHeights>>([]);

    const create = React.useCallback((toast: Partial<IToast>) => {
        setToasts((prevState) => [
            {
                ...toast,
                id: toast?.id ?? uuidv4(),
                duration: toast?.duration ?? DEFAULT_TOAST_DURATION,
            },
            ...(prevState.length === MAX_TOASTS ? prevState.slice(0, MAX_TOASTS - 1) : prevState),
        ]);
    }, []);

    const message = React.useCallback((message: string | React.ReactNode, options?: IExternalToast) => {
        create({ ...options, title: message });
    }, [create]);

    const error = React.useCallback((message: string | React.ReactNode, options?: IExternalToast) => {
        create({ ...options, title: message, type: "error" });
    }, [create]);

    const success = React.useCallback((message: string | React.ReactNode, options?: IExternalToast) => {
        create({ ...options, title: message, type: "success" });
    }, [create]);

    const info = React.useCallback((message: string | React.ReactNode, options?: IExternalToast) => {
        create({ ...options, title: message, type: "info" });
    }, [create]);

    const warning = React.useCallback((message: string | React.ReactNode, options?: IExternalToast) => {
        create({ ...options, title: message, type: "warning" });
    }, [create]);

    const removeToast = React.useCallback((id: IToast["id"]) => {
        setToasts((prevState) => prevState.filter((toast) => toast.id !== id));
    }, []);

    return {
        toasts,
        heights,
        toast: {
            message,
            error,
            success,
            info,
            warning,
        },
        actions: {
            removeToast,
            setHeights,
        },
    };
};