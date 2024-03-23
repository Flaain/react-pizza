import React from "react";
import Input from "@/shared/ui/Input/ui";
import PasswordInput from "@/shared/ui/PasswordInput/ui/ui";
import AuthButton from "../AuthButton";
import cn from "@/shared/lib/classNames";
import Typography from "@/shared/ui/Typography/ui/ui";
import { AnimatePresence, motion } from "framer-motion";
import { errorsAnimation } from "@/widgets/FormUserAddress/model/animation";
import { useForm } from "@/shared/hooks/useForm";
import { signinform } from "../../model/form";
import { FormProps } from "../../model/interfaces";
import { useDispatch } from "react-redux";
import { signin } from "@/app/redux/slice/user.slice";
import { cartSelector } from "@/shared/model/selectors";
import { useAppSelector } from "@/shared/model/store";
import { api } from "@/shared/api";
import { setCart } from "@/pages/Cart/model/slice";
import { toast } from "@/shared/lib/toast";

const SigninForm = ({ setActiveForm }: FormProps) => {
    const { errors, isFormValid, register, submitHandler } = useForm();
    const { cart } = useAppSelector(cartSelector);

    const [loading, setLoading] = React.useState(false);

    const abortControllerRef = React.useRef<AbortController | null>(null);

    const dispatch = useDispatch();

    const updateCartOnSignin = async (token: string) => {
        try {
            const {
                data: { cart: updatedCart },
            } = await api.cart.updateCart({ token, body: JSON.stringify([...cart.values()]) });
            dispatch(setCart(updatedCart));
        } catch (error) {
            console.error(error);
            // dispatch(clearCart());
        }
    };

    const handleSubmit = async (data: Record<string, string>) => {
        abortControllerRef.current && abortControllerRef.current.abort();
        abortControllerRef.current = new AbortController();

        try {
            setLoading(true);

            const {
                data: { user },
            } = await api.user.signin({ body: JSON.stringify(data), signal: abortControllerRef.current.signal });

            cart.size ? updateCartOnSignin(user.token) : dispatch(setCart(user.cart));

            dispatch(signin(user));
        } catch (error) {
            console.error(error);
            error instanceof Error && toast.error("Ошибка при входе", { description: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-10 flex flex-col justify-center items-center max-w-[600px] w-full box-content'>
            <div className='flex flex-col items-start self-start gap-3 mb-10'>
                <Typography as='h1' size='5xl' weight='bold'>
                    Вход
                </Typography>
                <div className='inline-flex items-center'>
                    <Typography as='p' size='md'>
                        Уже есть аккаунт?&nbsp;
                    </Typography>
                    <button
                        onClick={() => setActiveForm("signin")}
                        className='text-lg font-medium text-primary-orange border-b-2 cursor-pointer border-solid border-primary-orange'
                    >
                        Войти
                    </button>
                </div>
            </div>
            <form className='flex flex-col gap-8 max-w-[600px] w-full' onSubmit={submitHandler(handleSubmit)}>
                <label className='flex flex-col gap-2 transition-all duration-200 ease-in-out relative'>
                    <Typography>Введите почту</Typography>
                    <Input
                        {...register(signinform.email, { validateOnChange: true })}
                        className='border border-solid border-primary-gray px-5 py-2 rounded-lg outline-gray-200 max-w-[600px] w-full'
                    />
                    <AnimatePresence>
                        {errors["email"] && (
                            <motion.span {...errorsAnimation} className='absolute -bottom-6 text-red-500 text-sm'>
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
                <button
                    type='button'
                    className={cn({
                        "text-primary-orange font-medium self-start": true,
                        "-mt-5": !errors["password"],
                    })}
                >
                    Забыли пароль?
                </button>
                <AuthButton title='Войти' disabled={!isFormValid || loading} />
            </form>
        </div>
    );
};

export default SigninForm;
