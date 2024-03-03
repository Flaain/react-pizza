import React from "react";
import Input from "@/shared/ui/Input/ui";
import PasswordInput from "@/shared/ui/PasswordInput/ui/ui";
import AuthButton from "../AuthButton";
import { AnimatePresence, motion } from "framer-motion";
import { errorsAnimation } from "@/widgets/FormUserAddress/model/animation";
import { useForm } from "@/shared/hooks/useForm";
import { signinform } from "../../model/form";
import { FormProps } from "../../model/interfaces";
import { useDispatch } from "react-redux";
import { signin } from "@/app/redux/slice/user.slice";
import { ApiError } from "@/shared/api/error";
import { cartSelector } from "@/shared/model/selectors";
import { useAppSelector } from "@/shared/model/store";
import { api } from "@/shared/api";
import { setCart } from "@/pages/Cart/model/slice";
import { useToast } from "@/shared/hooks/useToast";
import Toaster from "@/shared/ui/Toaster/ui/ui";

const SigninForm = ({ setActiveForm }: FormProps) => {
    const { errors, isFormValid, register, submitHandler } = useForm();
    const { cart } = useAppSelector(cartSelector);
    const { toast, toasts, heights, actions: { setHeights, removeToast } } = useToast();

    const [loading, setLoading] = React.useState(false);

    const abortControllerRef = React.useRef<AbortController | null>(null);

    const dispatch = useDispatch();

    const updateCartOnSignin = async (token: string) => {
        try {
            const { cart: updatedCart } = await api.cart.updateCart({ token, body: JSON.stringify([...cart.values()]) });
            dispatch(setCart(updatedCart));
        } catch (error) {
            console.error(error);
            // dispatch(clearCart());
        }
    }

    const handleSubmit = async (data: Record<string, string>) => {
        abortControllerRef.current && abortControllerRef.current.abort();
        abortControllerRef.current = new AbortController();

        try {
            setLoading(true);

            const { user } = await api.user.signin({ body: JSON.stringify(data), signal: abortControllerRef.current.signal });
            
            cart.size ? updateCartOnSignin(user.token) : dispatch(setCart(user.cart));
            
            dispatch(signin(user));
        } catch (error) {
            console.error(error);
            error instanceof ApiError && toast.error(error.message, { closeButton: true,  description: "Проверьте правильность введенных данных" });
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-10 flex flex-col justify-center items-center max-w-[600px] w-full box-content'>
            <Toaster toasts={toasts} heights={heights} setHeights={setHeights} removeToast={removeToast} />
            <div className='flex flex-col items-start self-start gap-3 mb-10'>
                <h1 className='text-5xl font-bold text-primary-black'>Вход</h1>
                <p className='text-primary-black'>
                    Нет аккаунта?&#32;<span
                        onClick={() => setActiveForm("signup")}
                        className='text-primary-orange border-b-2 cursor-pointer border-solid border-primary-orange'
                    >
                        Создайте прямо сейчас
                    </span>
                </p>
            </div>
            <form className='flex flex-col gap-5 max-w-[600px] w-full' onSubmit={submitHandler(handleSubmit)}>
                <label className='flex flex-col gap-2 transition-all duration-200 ease-in-out'>
                    <span className='text-primary-black'>Введите почту</span>
                    <Input
                        {...register(signinform.email, { validateOnChange: true })}
                        className='border border-solid border-primary-gray px-5 py-2 rounded-lg outline-gray-200 max-w-[600px] w-full'
                    />
                    <AnimatePresence>
                        {errors["email"] && (
                            <motion.span {...errorsAnimation} className='text-red-500 text-sm'>
                                {errors["email"]}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </label>
                <PasswordInput
                    {...register(signinform.password, { validateOnChange: true })}
                    label={signinform.password.label}
                    error={errors["password"]}
                    hasEye
                    className='border border-solid border-primary-gray pl-5 pr-[60px] py-2 rounded-lg outline-gray-200 max-w-[600px] w-full'
                />
                <span className='text-primary-orange font-medium'>Забыли пароль?</span>
                <AuthButton title="Войти" disabled={!isFormValid || loading} />
            </form>
        </div>
    );
};

export default SigninForm;