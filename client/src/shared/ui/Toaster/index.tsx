import React from "react";
import Toast from "../Toast";
import { IHeights, IToast } from "@/shared/lib/toast/types";
import { toastState } from "@/shared/lib/toast";

const MAX_TOASTS = 3;

const Toaster = ({ duration }: { duration?: number }) => {
    const [toasts, setToasts] = React.useState<Array<IToast>>([]);
    const [heights, setHeights] = React.useState<Array<IHeights>>([]);
    const [expanded, setExpanded] = React.useState(false);

    React.useEffect(() => {
        return toastState.subscribe((toast) => {
            setToasts((prevState) => [
                toast,
                ...(prevState.length === MAX_TOASTS ? prevState.slice(0, MAX_TOASTS - 1) : prevState),
            ]);
        });
    }, []);

    const removeToast = React.useCallback((id: number | string) => {
        setToasts((prevState) => prevState.filter((toast) => toast.id !== id));
    }, []);

    if (!toasts.length) return null;

    return (
        <section className='fixed z-[9999] touch-manipulation outline-none pointer-events-none inset-5'>
            <ul
                className='flex'
                onMouseEnter={() => toasts.length > 1 && setExpanded(true)}
                onMouseLeave={() => setExpanded(false)}
            >
                {toasts.map((toast, index) => (
                    <Toast
                        {...toast}
                        key={toast.id}
                        heights={heights}
                        expanded={expanded}
                        setHeights={setHeights}
                        removeToast={removeToast}
                        index={index}
                        toasts={toasts}
                        duration={duration ?? toast.duration}
                    />
                ))}
            </ul>
        </section>
    );
};

export default Toaster;