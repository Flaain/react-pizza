import React from "react";
import { ErrorsState, Field, Validation } from "./types";
import { validationRules } from "./utils/staticValidationRules";

/* 
    Just a quick remark. I provide in every change action like onChange, onBlur and etc "name" as a first parameter.
    At first i was using "name" provided by event target but unfortunately user can easily change name attribute and it can costs a bugs
    the solution i was thinking about something like this:
    
    if (!form[name]) return;

    but it's kinda strict so i decided just provide original name from initial form. If u know some better solution please feel free to make
    a pull request i will really appreciate you
*/

export const useForm = () => {
    const [form, setForm] = React.useState<Record<string, Field>>({});
    const [errors, setErrors] = React.useState<ErrorsState>({});

    const isInputValid = React.useCallback((name: string, value: string) => {
        return Object.keys(form[name].validation).find((key) => {
            return !validationRules[key as keyof typeof validationRules]({ name, value, validation: form[name].validation });
        });
    }, [form]); // I don't know if useMemo is necessary cuz we change form on every onChange action

    const register = (field: Field) => {
        !form[field.name] && setForm((prevState) => ({ ...prevState, [field.name]: field }));
        
        return {
            name: field.name,
            value: form[field.name]?.value ?? field.value,
            onBlur: handleBlur,
            onChange: handleChange,
            onFocus: handleFocus
        }
    }

    const handleFocus = ({ target: { name } }: React.FocusEvent<HTMLInputElement>) => {
        !form[name].isDirty && setForm((prevState) => ({ ...prevState, [name]: { ...form[name], isDirty: true } }));
    }

    const submitHandler = (cb: (data: Record<string, string>) => void) => {
        return (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            
            const errors: ErrorsState = {};

            if (!isFormValid) {
                Object.values(form).forEach(({ name, validation, value }) => {
                    const errorKey = isInputValid(name, value);
                    errorKey && (errors[name] = (validation[errorKey as keyof Validation]?.errorMessage as string));
                });
                setErrors((prevState) => ({ ...prevState, ...errors }));
                return;
            }
            
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            cb(Object.fromEntries(Object.entries(form).map(([_, { value, name }]) => [name, value])));
        }
    };

    const handleBlur = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const errorKey = isInputValid(name, value);

        setErrors((prevState) => ({ 
            ...prevState, 
            [name]: (errorKey && form[name]?.isDirty) ? form[name].validation[errorKey as keyof Validation]!.errorMessage : null
         }))
    };

    const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm((prevState) => ({ ...prevState, [name]: { ...prevState[name], value } }));
    };
    
    const isFormValid = React.useMemo(() => {
        return Object.values(form).every(({ name, validation, value }) => {
            return Object.keys(validation).every((key) => {
                return validationRules[key as keyof typeof validationRules]({ name, value, validation });
            });
        });
    }, [form]);

    return {
        submitHandler,
        register,
        isFormValid,
        errors
    };
};