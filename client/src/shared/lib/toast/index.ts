import { Toast } from "./toast";

export const toastState = new Toast();
export const toast = {
    message: toastState.message,
    error: toastState.error,
    success: toastState.success,
    info: toastState.info,
    warning: toastState.warning,
};