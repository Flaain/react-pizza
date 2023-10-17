import React from "react";
import { motion } from "framer-motion";
import { Props } from "../interfaces";

const ModalContainer: React.FC<Props> = ({ children, paramsUpdater, stateUpdater }) => {
    React.useEffect(() => {
        const handleKeyUp = ({ key }: KeyboardEvent) => {
            if (key === "Escape") {
                stateUpdater ? stateUpdater(false) : paramsUpdater!();
            }
        };

        document.body.classList.add('overflow-hidden')
        document.addEventListener("keyup", handleKeyUp);
        return () => {
            document.body.classList.remove('overflow-hidden')
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    const handleOverlayClick = ({ target, currentTarget }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (target === currentTarget) {
            stateUpdater ? stateUpdater(false) : paramsUpdater!();
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