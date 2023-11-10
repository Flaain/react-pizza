import React from "react";
import CategorieItem from "../../CategorieItem/ui";
import { AnimatePresence, motion } from "framer-motion";
import { initialCategories } from "@/shared/config/constants";
import { useDispatch } from "react-redux";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";

const SidebarCategories = () => {
    const [show, setShow] = React.useState(false);
    const dispatch = useDispatch();

    React.useEffect(() => {
        const handleKeyup = ({ key }: KeyboardEvent) => {
            if (key === "Escape") {
                setShow(false);
                document.body.classList.remove("overflow-hidden");
            }
        };

        document.addEventListener("keyup", handleKeyup);

        return () => {
            document.removeEventListener("keyup", handleKeyup);
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    const handleOpen = () => {
        setShow(true);
        document.body.classList.add("overflow-hidden");
    };

    const handleOverlayClose = ({ target, currentTarget }: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => {
        if (target === currentTarget) {
            setShow(false);
            document.body.classList.remove("overflow-hidden");
        }
    };
    
    const handleClose = () => {
        setShow(false);
        document.body.classList.remove("overflow-hidden");
    }

    const handleClick = (index: number) => {
        dispatch(changeCategorieParam(index || null));
        setShow(false);
        document.body.classList.remove("overflow-hidden");
    };
    
    return (
        <>
            <button
                onClick={handleOpen}
                className='flex items-center gap-2 bg-primary-gray py-2 px-3 rounded-full outline-none'
            >
                <span className='text-primary-black font-medium'>Категория</span>
                <span className='px-5 py-2 rounded-full cursor-pointer font-medium transition-colors duration-200 ease-in-out bg-primary-black text-white'>
                    {initialCategories[categorieFilterIndex ?? 0].name}
                </span>
            </button>
            <AnimatePresence>
                {show && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: "easeInOut", duration: 0.2 }}
                        onClick={handleOverlayClose}
                        className='fixed inset-0 bg-modal z-50 flex justify-start'
                    >
                        <motion.div
                            initial={{ x: "-100px" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100px" }}
                            transition={{ ease: "easeInOut", duration: 0.2 }}
                            className='min-w-[300px] bg-primary-gray p-5 h-full flex flex-col gap-8'
                        >
                            <div className='flex items-center justify-between w-full gap-5'>
                                <h1 className='text-3xl text-primary-black font-bold mt-5'>Категории</h1>
                                <button onClick={handleClose}>
                                    <img src={getImageUrl("close.svg")} alt='close window' />
                                </button>
                            </div>
                            <ul className="flex flex-col justify-start gap-5 overflow-auto">
                                {initialCategories.map(({ name }, index) => (
                                    <CategorieItem {...{ key: name, index, name, handleClick }} />
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SidebarCategories;