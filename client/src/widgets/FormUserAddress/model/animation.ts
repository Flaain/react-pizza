import { MotionProps } from "framer-motion";

export const errorsAnimation: MotionProps = {
    initial: { opacity: 0, y: "10px" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "10px" },
    transition: { ease: "easeInOut", duration: 0.2 },
};