import React from "react";
import cn from "@/shared/lib/classNames";
import { Props } from "../model/interfaces";
import { useForm } from "@/shared/hooks/useForm";
import { form } from "../model/form";

const FormUserAddress = ({ setShowAddForm }: Props) => {
    const { renderFields, submitHandler, isFormValid } = useForm(form);

    const handleSubmit = (data: { [key: string]: string }) => {
        console.log(data);
    };

    return (
        <form className='flex flex-col h-full' onSubmit={submitHandler(handleSubmit)}>
            <fieldset className='grid grid-cols-2 gap-5'>{renderFields()}</fieldset>
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