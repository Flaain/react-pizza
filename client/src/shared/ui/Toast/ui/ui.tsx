import React from "react";
import cn from "@/shared/lib/classNames";
import { motion } from "framer-motion";
import { IToastProps, ToastType } from "@/shared/hooks/useToast/types";
import { getAsset } from "@/shared/hooks/useToast/assets";

// const variants: Record<Exclude<ToastType, "default" | "action" | "normal">, string> = {
//     error: "bg-red-400 text-white",
//     success: "bg-green-500",
//     info: "bg-blue-500",
//     warning: "bg-yellow-500",
// };

const DEFAULT_GAP = 12;

const Toast = ({
    id,
    closeButton,
    description,
    duration,
    toasts,
    onAutoClose,
    heights,
    onClose,
    title,
    type,
    index,
    removeToast,
    setHeights,
    expanded,
    gap = DEFAULT_GAP,
    autoClose = true,
    recalculateRemainingTime = false,
}: IToastProps) => {
    const [height, setHeight] = React.useState(0);
    const [isInteracting, setIsInteracting] = React.useState(false);

    const toastRef = React.useRef<HTMLLIElement>(null);
    const heightIndex = React.useMemo(() => heights.findIndex((height) => height.id === id) || 0, [heights, id]);
    const toastsHeightBefore = React.useMemo(() => heights.reduce((acc, { height }, reducerIndex) => (reducerIndex >= heightIndex ? acc : acc + height), 0), [heights, heightIndex])
    const offset = React.useMemo(() => Math.floor(heightIndex * gap + toastsHeightBefore), [heightIndex, toastsHeightBefore]);
    const timerRef = React.useRef<{ start: number; end: number; remaining: number; id: NodeJS.Timeout | null }>({
        start: 0,
        end: 0,
        remaining: duration,
        id: null,
    });

    const handleClose = React.useCallback(() => {
        removeToast(id);
        onClose?.({ id, description, title, type });
    }, [])

    React.useEffect(() => {
        toastRef.current && setHeights((prevState) => [{ id, height: toastRef.current!.getBoundingClientRect().height }, ...prevState]);
        return () => setHeights((prevState) => prevState.filter((toast) => toast.id !== id));
    }, [id, setHeights]);

    React.useEffect(() => {
        if (!heights.length) return;
        setHeight(heights[0].height);
    }, [heights]);

    React.useEffect(() => {
        if (!autoClose) return;

        const startTimer = () => {
            timerRef.current = {
                ...timerRef.current,
                start: Date.now(),
                id: setTimeout(() => {
                    onAutoClose?.({ id, type, title, description });
                    removeToast(id);
                }, recalculateRemainingTime ? timerRef.current.remaining : duration),
            };
        };

        const pauseTimer = () => {
            const end = Date.now();
            
            timerRef.current.end < timerRef.current.start && (timerRef.current = {
                ...timerRef.current,
                remaining: timerRef.current.remaining - (end - timerRef.current.start),
                end,
            });
        };

        (expanded || isInteracting) ? pauseTimer() : startTimer();

        return () => {
            timerRef.current?.id && clearTimeout(timerRef.current.id);
        };
    }, [expanded, isInteracting]);

    return (
        <motion.li
            style={{ zIndex: toasts.length - index, height: expanded ? (heights[heightIndex]?.height ?? "auto") : (height || "auto") }}
            className={cn(
                `bg-slate-100 absolute pointer-events-auto after:h-[${gap}px] transition-[height] duration-200 ease-in-out after:pointer-events-auto after:left-0 after:right-0 after:absolute after:-top-3 after:block max-w-[350px] w-full bottom-0 right-0 p-4 rounded-lg box-border border border-gray-200 border-solid shadow-md`
                // variants[type as keyof typeof variants] ?? "bg-white"
            )}
            ref={toastRef}
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            animate={{
                opacity: 1,
                y: expanded ? -offset : -(gap * index),
                scale: expanded ? 1 : Math.abs(index * 0.05 - 1),
            }}
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
        >
            <div
                className={cn(
                    "flex items-center justify-start gap-2 opacity-0 transition-opacity duration-300 ease-in-out overflow-hidden",
                    (expanded || !index) && "opacity-100"
                )}
            >
                {getAsset(type as ToastType)}
                <div className='flex flex-col'>
                    <span>{title}</span>
                    {description && <p className='text-xs'>{description}</p>}
                </div>
                {closeButton && (
                    <button
                        className='absolute right-3 top-2 opacity-50 hover:opacity-100 transition-opacity duration-200 ease-in-out'
                        onClick={handleClose}
                    >
                        <svg width='14' height='14' viewBox='0 0 16 16' fill='currentColor'>
                            <path d='M2.96967 2.96967C3.26256 2.67678 3.73744 2.67678 4.03033 2.96967L8 6.939L11.9697 2.96967C12.2626 2.67678 12.7374 2.67678 13.0303 2.96967C13.3232 3.26256 13.3232 3.73744 13.0303 4.03033L9.061 8L13.0303 11.9697C13.2966 12.2359 13.3208 12.6526 13.1029 12.9462L13.0303 13.0303C12.7374 13.3232 12.2626 13.3232 11.9697 13.0303L8 9.061L4.03033 13.0303C3.73744 13.3232 3.26256 13.3232 2.96967 13.0303C2.67678 12.7374 2.67678 12.2626 2.96967 11.9697L6.939 8L2.96967 4.03033C2.7034 3.76406 2.6792 3.3474 2.89705 3.05379L2.96967 2.96967Z'></path>
                        </svg>
                    </button>
                )}
            </div>
        </motion.li>
    );
};

export default Toast;