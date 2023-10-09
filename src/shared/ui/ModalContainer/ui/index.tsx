import React from "react";
import { motion } from "framer-motion";
import { Props } from "../interfaces";

const ModalContainer: React.FC<Props> = ({ children, updater }) => {
    React.useEffect(() => {
        const handleKeyUp = ({ key }: KeyboardEvent) => {
            if (key === "Escape") {
                updater(false);
            }
        };

        document.body.style.overflow = "hidden";
        document.addEventListener("keyup", handleKeyUp);
        return () => {
            document.body.style.overflow = "unset";
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    const handleOverlayClick = ({ target, currentTarget }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (target === currentTarget) {
            updater(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
            className='fixed inset-0 bg-modal z-50 flex items-center justify-center'
            onClick={handleOverlayClick}
        >
            {children}
        </motion.div>
    );
};

export default ModalContainer;