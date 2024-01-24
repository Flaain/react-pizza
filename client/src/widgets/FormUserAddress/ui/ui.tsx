import cn from "@/shared/lib/classNames";
import Input from "@/shared/ui/Input/ui";
import { Props } from "../model/interfaces";
import { useForm } from "@/shared/hooks/useForm";
import { useDispatch } from "react-redux";
import { setNewAddress } from "@/app/redux/slice/user.slice";
import { form } from "../model/form";
import { AnimatePresence, motion } from "framer-motion";
import { errorsAnimation } from "../model/animation";

const FormUserAddress = ({ setShowAddForm }: Props) => {
    const { submitHandler, isFormValid, register, errors } = useForm({ validateOnChange: true });

    const dispatch = useDispatch();

    const handleSubmit = (data: { [key: string]: string }) => {
        // dispatch(setNewAddress({ address: `${data.city}, ${data.address}, ${data.building}, ${data.postcode}` }));
        // setShowAddForm(false);
        console.log(data);
    };

    return (
        <form className='flex flex-col h-full' onSubmit={submitHandler(handleSubmit)}>
            <fieldset className='grid grid-cols-2 gap-5'>
                {Object.values(form).map(({ label, ...field }) => (
                    <label className='flex flex-col gap-2 min-h-fit transition-all duration-200 ease-in-out' key={field.name}>
                        {label && <span className='text-primary-black'>{label}</span>}
                        <Input
                            {...register(field)}
                            className='border border-solid border-primary-gray px-5 py-2 rounded-lg outline-gray-200'
                        />
                        <AnimatePresence>
                            {errors[field.name] && (
                                <motion.span {...errorsAnimation} className='text-red-500 text-sm'>
                                    {errors[field.name]}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </label>
                ))}
            </fieldset>
            <div className='mt-auto flex items-center gap-5'>
                <button
                    disabled={!isFormValid}
                    className={cn(
                        "flex items-center justify-center py-2 px-5 rounded-lg bg-primary-orange text-white",
                        !isFormValid && "opacity-50 cursor-default"
                    )}
                >
                    Сохранить
                </button>
                <button
                    onClick={() => setShowAddForm(false)}
                    className='bg-primary-orange/10 py-2 px-5 rounded-lg text-primary-orange hover:bg-primary-orange/20 transition-colors duration-200 ease-in-out'
                >
                    Отмена
                </button>
            </div>
        </form>
    );
};

export default FormUserAddress;