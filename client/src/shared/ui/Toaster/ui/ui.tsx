import React from "react";
import Toast from "../../Toast/ui/ui";
import { IHeights, IToast } from "@/shared/hooks/useToast/types";

const Toaster = ({
    toasts,
    setHeights,
    removeToast,
    duration,
    heights,
}: {
    toasts: Array<IToast>;
    setHeights: React.Dispatch<React.SetStateAction<Array<IHeights>>>;
    removeToast: (id: number | string) => void;
    duration?: number;
    heights: Array<IHeights>;
}) => {
    const [expanded, setExpanded] = React.useState(false);

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
                        key={toast.id}
                        {...toast}
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