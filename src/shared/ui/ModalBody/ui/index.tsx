import React from "react";
import { motion } from "framer-motion";

const ModalBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
            className='flex flex-col gap-5 max-h-[600px] max-w-[750px] overflow-auto w-full h-full bg-white rounded-lg p-8 box-border border border-solid border-primary-gray'
        >
            {children}
        </motion.div>
    );
};

export default ModalBody;