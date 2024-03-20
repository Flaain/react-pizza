import React from "react";
import cn from "@/shared/lib/classNames";
import Container from "@/shared/ui/Container";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Props } from "../model/interfaces";
import Typography from "@/shared/ui/Typography/ui/ui";

const NotFound = ({
    title,
    description,
    backLink,
    backLinkText = "Вернуться назад",
    reloadButton,
    reloadButtonText = "Обновить страницу",
    screen,
    error,
}: Props) => {
    const [showError, setShowError] = React.useState(false);

    const convertedError = JSON.stringify(error, null, 2);

    const handleCopyClipboard = () => {
        navigator.clipboard.writeText(convertedError);
        alert("Код ошибки был скопирован в буфер обмена");
    };

    return (
        <section>
            <Container
                classNames={cn(
                    "max-w-[1320px] w-full my-0 mx-auto px-[15px] box-border flex flex-col items-center justify-center gap-5 text-center",
                    screen ? "min-h-screen" : "min-h-[calc(100vh-132px)]"
                )}
            >
                <Typography size="3xl" weight="bold">{title}</Typography>
                {description && (
                    <p className='text-gray-400 text-xl font-medium text-center max-md:text-lg'>{description}</p>
                )}
                {!!error && (
                    <motion.div
                        animate={{ height: showError ? "auto" : "30px" }}
                        transition={{ ease: "easeInOut", duration: 0.2 }}
                        className='flex flex-col gap-2'
                    >
                        <button
                            className='bg-primary-black/5 whitespace-nowrap text-primary-orange py-2 px-6 w-[230px] rounded-full flex self-center items-center justify-center'
                            onClick={() => setShowError((prevState) => !prevState)}
                        >
                            {showError ? "скрыть код ошибки" : "раскрыть код ошибки"}
                        </button>
                        <AnimatePresence>
                            {showError && (
                                <motion.code
                                    className='cursor-pointer bg-primary-orange/10 p-5 rounded'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ ease: "easeInOut", duration: 0.2 }}
                                    key='error-block'
                                    onClick={handleCopyClipboard}
                                >
                                    {convertedError}
                                </motion.code>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
                {backLink && !reloadButton && (
                    <Link
                        to='/'
                        className='bg-primary-black text-white py-2 px-6 rounded-full flex items-center justify-center'
                    >
                        {backLinkText}
                    </Link>
                )}
                {reloadButton && !backLink && (
                    <button
                        className='bg-primary-black text-white whitespace-nowrap py-2 px-6 rounded-full flex items-center justify-center'
                        onClick={() => window.location.reload()}
                    >
                        {reloadButtonText}
                    </button>
                )}
            </Container>
        </section>
    );
};

export default NotFound;