import { Observer } from "../../model/observer";
import { IExternalToast, IToast } from "./types";

const DEFAULT_TOAST_DURATION = 3000;
const MAX_TOASTS = 3;

export class Toast extends Observer {
    private toasts: Array<IToast>;
    private DEFAULT_TOAST_DURATION: number;
    private MAX_TOASTS: number;

    constructor({ duration, maxToasts }: { duration?: number; maxToasts?: number } = {}) {
        super();

        this.toasts = [];
        this.DEFAULT_TOAST_DURATION = duration ?? DEFAULT_TOAST_DURATION;
        this.MAX_TOASTS = maxToasts ?? MAX_TOASTS;
    }

    private create = (toast: IToast) => {
        this.toasts = [toast, ...(this.toasts.length === this.MAX_TOASTS ? this.toasts.slice(0, this.MAX_TOASTS - 1) : this.toasts)];
        this.notify(toast);
    };

    message = (message: string | React.ReactNode, options?: IExternalToast) => {
        this.create({
            ...options,
            title: message,
            id: options?.id ?? window.crypto.randomUUID(),
            duration: options?.duration ?? this.DEFAULT_TOAST_DURATION,
        });
    };

    error = (message: string | React.ReactNode, options?: IExternalToast) => {
        this.create({
            ...options,
            type: "error",
            title: message,
            id: options?.id ?? window.crypto.randomUUID(),
            duration: options?.duration ?? this.DEFAULT_TOAST_DURATION,
        });
    };

    success = (message: string | React.ReactNode, options?: IExternalToast) => {
        this.create({
            ...options,
            type: "success",
            title: message,
            id: options?.id ?? window.crypto.randomUUID(),
            duration: options?.duration ?? this.DEFAULT_TOAST_DURATION,
        });
    };

    info = (message: string | React.ReactNode, options?: IExternalToast) => {
        this.create({
            ...options,
            type: "info",
            title: message,
            id: options?.id ?? window.crypto.randomUUID(),
            duration: options?.duration ?? this.DEFAULT_TOAST_DURATION,
        });
    };

    warning = (message: string | React.ReactNode, options?: IExternalToast) => {
        this.create({
            ...options,
            type: "warning",
            title: message,
            id: options?.id ?? window.crypto.randomUUID(),
            duration: options?.duration ?? this.DEFAULT_TOAST_DURATION,
        });
    };

    removeToast = (id: IToast["id"]) => {
        this.toasts = this.toasts.filter((toast) => toast.id !== id);
    };
}