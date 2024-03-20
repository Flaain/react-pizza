import React from "react";
import PasswordInput from "@/shared/ui/PasswordInput/ui/ui";
import Input from "@/shared/ui/Input/ui";
import AuthButton from "../AuthButton";
import Typography from "@/shared/ui/Typography/ui/ui";
import { useForm } from "@/shared/hooks/useForm";
import { FormProps } from "../../model/interfaces";
import { signupform } from "../../model/form";
import { useDispatch } from "react-redux";
import { signin } from "@/app/redux/slice/user.slice";
import { ApiError } from "@/shared/api/error";
import { RegisterOptions } from "@/shared/hooks/useForm/types";
import { api } from "@/shared/api";
import { setCart } from "@/pages/Cart/model/slice";
import { useAppSelector } from "@/shared/model/store";
import { cartSelector } from "@/shared/model/selectors";

const SignupForm = ({ setActiveForm }: FormProps) => {
    const [loading, setLoading] = React.useState(false);
    const [errorState, setErrorState] = React.useState<{ prevForm: Record<string, string>; error: string; valid: boolean; } | null>(null);

    const { errors, isFormValid, register, submitHandler, getFormValues } = useForm({ provideFormValues: true });
    const { cart } = useAppSelector(cartSelector);

    const controller = React.useRef<AbortController | null>(null);

    const dispatch = useDispatch();

    const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
        const formValues = { ...getFormValues(), [name]: value }; // don't like it at all but right now can't figure how get actual values

        errorState &&
            setErrorState((prevState) => {
                const valid = Object.entries(prevState!.prevForm).every(([key, value]) => value !== formValues[key]);
                return { ...prevState!, valid };
            });
    };

    const regOptions: RegisterOptions = { onChange: handleChange, validateOnChange: true };

    const updateCartOnSignup = async (token: string) => {
        try {
            const {
                data: { cart: updatedCart },
            } = await api.cart.updateCart({ body: JSON.stringify([...cart.values()]), token });

            dispatch(setCart(updatedCart));
        } catch (error) {
            console.error(error);
            // dispatch(clearCart());
        }
    };

    const handleSubmit = async ({ name, email, password }: Record<string, string>) => {
        controller.current && controller.current.abort();
        controller.current = new AbortController();

        try {
            setLoading(true);

            const {
                data: { user },
            } = await api.user.signup({
                body: JSON.stringify({ name, email, password }),
                signal: controller.current.signal,
            });

            cart.size ? updateCartOnSignup(user.token) : dispatch(setCart(user.cart));

            dispatch(signin(user));
        } catch (error) {
            console.error(error);
            error instanceof ApiError && setErrorState({ prevForm: { email }, error: error.message, valid: false });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-10 flex flex-col justify-center items-center max-w-[600px] w-full box-content'>
            <div className='flex flex-col items-start self-start gap-3 mb-10'>
                <Typography as='h1' size='5xl' weight='bold'>
                    Регистрация
                </Typography>
                <div className='inline-flex items-center'>
                    <Typography as='p'>Уже есть аккаунт?&nbsp;</Typography>
                    <button
                        onClick={() => setActiveForm("signin")}
                        className='text-lg font-medium text-primary-orange border-b-2 cursor-pointer border-solid border-primary-orange'
                    >
                        Войти
                    </button>
                </div>
            </div>
            <form className='flex flex-col gap-8 max-w-[600px] w-full' onSubmit={submitHandler(handleSubmit)}>
                {Object.entries(signupform).map(([key, field]) => (
                    <React.Fragment key={key}>
                        {field.type === "password" ? (
                            <PasswordInput
                                {...register(field, regOptions)}
                                label={field.label}
                                error={errors[field.name]}
                                hasEye
                                className='border border-solid border-primary-gray pl-5 pr-[60px] py-2 rounded-lg outline-gray-200 max-w-[600px] w-full'
                            />
                        ) : (
                            <Input
                                {...register(field, regOptions)}
                                label={field.label}
                                error={errors[field.name]}
                                className='border border-solid border-primary-gray px-5 py-2 rounded-lg outline-gray-200 max-w-[600px] w-full'
                            />
                        )}
                    </React.Fragment>
                ))}
                <AuthButton
                    title='Зарегистрироваться'
                    disabled={!isFormValid || loading || (errorState ? !errorState.valid : false)}
                />
            </form>
        </div>
    );
};

export default SignupForm;