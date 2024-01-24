import React from "react";
import PasswordInput from "@/shared/ui/PasswordInput/ui/ui";
import Input from "@/shared/ui/Input/ui";
import AuthButton from "../AuthButton";
import { useForm } from "@/shared/hooks/useForm";
import { FormProps } from "../../model/interfaces";
import { AnimatePresence, motion } from "framer-motion";
import { signupform } from "../../model/form";
import { errorsAnimation } from "@/widgets/FormUserAddress/model/animation";
import { api } from "../../api";
import { useDispatch } from "react-redux";
import { signin } from "@/app/redux/slice/user.slice";

const SignupForm = ({ setActiveForm }: FormProps) => {
    const { errors, isFormValid, register, submitHandler } = useForm({ validateOnChange: true });

    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const controller = React.useRef<AbortController | null>(null);

    const dispatch = useDispatch();

    const handleSubmit = async ({ name, email, password }: Record<string, string>) => {
        controller.current && controller.current.abort();
        controller.current = new AbortController();
        
        const { data: { data: signupData } } = await api.signup({ name, email, password }, controller.current);

        dispatch(signin(signupData));
    };
    
    return (
        <div className='p-10 flex flex-col justify-center items-center max-w-[600px] w-full box-content'>
            <div className='flex flex-col items-start self-start gap-3 mb-10'>
                <h1 className='text-5xl font-bold text-primary-black'>Регистрация</h1>
                <p className='text-primary-black'>
                    Уже есть аккаунт?&#32;<span
                        onClick={() => setActiveForm("signin")}
                        className='text-primary-orange border-b-2 cursor-pointer border-solid border-primary-orange'
                    >
                        Войти
                    </span>
                </p>
            </div>
            <form className='flex flex-col gap-5 max-w-[600px] w-full' onSubmit={submitHandler(handleSubmit)}>
                <label className='flex flex-col gap-2 transition-all duration-200 ease-in-out'>
                    <span className='text-primary-black'>Введите имя</span>
                    <Input
                        {...register(signupform.name)}
                        className='border border-solid border-primary-gray px-5 py-2 rounded-lg outline-gray-200 max-w-[600px] w-full'
                    />
                    <AnimatePresence>
                        {errors["name"] && (
                            <motion.span {...errorsAnimation} className='text-red-500 text-sm'>
                                {errors["name"]}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </label>
                <label className='flex flex-col gap-2 transition-all duration-200 ease-in-out'>
                    <span className='text-primary-black'>Введите почту</span>
                    <Input
                        {...register(signupform.email)}
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
                    {...register({ ...signupform.password, type: isPasswordVisible ? "text" : "password" }, { watch: true })}
                    label={signupform.password.label}
                    onEyeClick={() => setIsPasswordVisible((prevState) => !prevState)}
                    isPasswordVisible={isPasswordVisible}
                    error={errors["password"]}
                    hasEye
                    className='border border-solid border-primary-gray pl-5 pr-[60px] py-2 rounded-lg outline-gray-200 max-w-[600px] w-full'
                />
                <PasswordInput
                    {...register({ ...signupform.confirmPassword, type: isConfirmPasswordVisible ? "text" : "password" }, { watch: true })}
                    label={signupform.confirmPassword.label}
                    onEyeClick={() => setIsConfirmPasswordVisible((prevState) => !prevState)}
                    isPasswordVisible={isConfirmPasswordVisible}
                    error={errors["confirmPassword"]}
                    hasEye
                    className='border border-solid border-primary-gray pl-5 pr-[60px] py-2 rounded-lg outline-gray-200 max-w-[600px] w-full'
                />
                <AuthButton title='Зарегистрироваться' disabled={!isFormValid || loading} />
            </form>
        </div>
    );
};

export default SignupForm;