import cn from "@/shared/lib/classNames";
import { Props } from "../model/interfaces";
import { useForm } from "@/shared/hooks/useForm";

const FormUserAddress = ({ setShowAddForm }: Props) => {
    const { submitHandler, isFormValid, register, errors } = useForm();

    const handleSubmit = (data: { [key: string]: string }) => {
        console.log(data);
    };

    return (
        <form className='flex flex-col h-full' onSubmit={submitHandler(handleSubmit)}>
            <fieldset className='grid grid-cols-2 gap-5'>
                <label className='flex flex-col gap-2'>
                    <span className='text-primary-black'>Введите город</span>
                    <input
                        {...register({
                            name: "city",
                            value: "",
                            isDirty: false,
                            validation: {
                                required: { errorMessage: "Поле обязательно для заполнения" },
                                minLength: { value: 5, errorMessage: "Минимальная длина поля - 5 символов" },
                                maxLength: { value: 20, errorMessage: "Максимальная длина поля - 20 символов" },
                            },
                        })}
                        className='border border-solid border-primary-gray px-5 py-2 rounded-lg outline-gray-200'
                    />
                    {errors.city && <span className='text-red-500 text-sm'>{errors.city}</span>}
                </label>
                <label className='flex flex-col gap-2'>
                    <span className='text-primary-black'>Введите адрес</span>
                    <input
                        {...register({
                            name: "address",
                            value: "",
                            isDirty: false,
                            validation: {
                                required: { errorMessage: "Поле обязательно для заполнения" },
                                minLength: { value: 5, errorMessage: "Минимальная длина поля - 5 символов" },
                            },
                        })}
                        className='border border-solid border-primary-gray px-5 py-2 rounded-lg outline-gray-200'
                    />
                    {errors.address && <span className='text-red-500 text-sm'>{errors.address}</span>}
                </label>
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