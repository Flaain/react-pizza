import React from "react";
import { motion } from "framer-motion";
import { Props } from "../model/interfaces";

const ModalContainer = ({ children, closeHandler }: Props) => {
    React.useEffect(() => {
        const handleKeyUp = ({ key }: KeyboardEvent) => {
            key === "Escape" && closeHandler();
        };

        document.body.style.paddingRight = window.innerWidth - document.body.offsetWidth + "px";
        document.body.classList.add("overflow-hidden");
        document.addEventListener("keyup", handleKeyUp);
        
        return () => {
            document.body.classList.remove("overflow-hidden");
            document.body.style.paddingRight = '0';
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    const handleOverlayClick = ({ target, currentTarget }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        target === currentTarget && closeHandler();
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