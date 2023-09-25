import React from "react";

const ModalBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className='flex flex-col gap-5 max-h-[600px] max-w-[750px] overflow-auto w-full h-full bg-white rounded-lg p-8 box-border border border-solid border-primary-gray'>
            {children}
        </div>
    );
};

export default ModalBody;