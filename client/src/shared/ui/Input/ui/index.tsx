import { forwardRef } from "react";
import { Props } from "../model/interfaces";
import { AnimatePresence, motion } from "framer-motion";
import { errorsAnimation } from "@/widgets/FormUserAddress/model/animation";

const Input = forwardRef(({ label, error, ...rest }: Props, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
        <label className='flex flex-col gap-2 transition-all duration-200 ease-in-out relative'>
            {label && <span className='text-primary-black'>{label}</span>}
            <input {...rest} ref={ref} />
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

export default Input;