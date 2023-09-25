import React from "react";
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
        }
    }, []);

    const handleOverlayClick = ({ target, currentTarget }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (target === currentTarget) {
            updater(false);
        }
    };

    return (
        <div className='fixed inset-0 bg-modal z-50 flex items-center justify-center' onClick={handleOverlayClick}>
            {children}
        </div>
    );
};

export default ModalContainer;