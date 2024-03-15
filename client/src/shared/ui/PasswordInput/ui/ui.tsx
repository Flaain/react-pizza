import React from "react";
import Input from "../../Input/ui";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import { forwardRef } from "react";
import { Props } from "../model/interfaces";
import { AnimatePresence, motion } from "framer-motion";
import { errorsAnimation } from "@/widgets/FormUserAddress/model/animation";

const PasswordInput = forwardRef(({ hasEye, label, error, ...rest }: Props, ref: React.ForwardedRef<HTMLInputElement>) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    return (
        <label className='flex flex-col gap-2 transition-all duration-200 ease-in-out relative'>
            {label && <span className='text-primary-black'>{label}</span>}
            <div className='relative w-full after:absolute after:right-[60px] after:top-[8px] after:bottom-[8px] after:w-[2px] after:bg-primary-gray'>
                <Input {...rest} type={isPasswordVisible ? "text" : "password"} ref={ref} />
                {hasEye && (
                    <button
                        type='button'
                        className='absolute right-5 top-1/2 -translate-y-1/2'
                        title={isPasswordVisible ? "Скрыть пароль" : "Показать пароль"}
                        onClick={() => setIsPasswordVisible((prevState) => !prevState)}
                    >
                        <img
                            src={getImageUrl(`eye_${isPasswordVisible ? "hide" : "show"}.svg`)}
                            alt={`${isPasswordVisible ? "hide" : "show"} password`}
                        />
                    </button>
                )}
            </div>
            <AnimatePresence>
                {error && (
                    <motion.span {...errorsAnimation} className='absolute -bottom-6 text-red-500 text-sm'>
                        {error}
                    </motion.span>
                )}
            </AnimatePresence>
        </label>
    );
});

export default PasswordInput;
