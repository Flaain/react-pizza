import React from "react";
import { Options } from "./types";
import { renderField } from "./utils/renderField";

/* Just a quick remark. I provide in every change action like onChange, onBlur and etc "name" as a first parameter
    at first i was using "name" provided by target but unfortunately user can easily change name attribute and it can costs a bugs
    the solution i was thinking about something like this:
    
    if (!form[name]) return;

    but it's kinda strict so i decided just provide original name from initial form. If u know some better solution please feel free to make
    a pull request i will really appreciate you
*/

export const useForm = (initial: Options) => {
    const [form, setForm] = React.useState(initial);

    const validationRules = {
        required: (_: string, value: string) => !!value.trim().length,
        minLength: (name: string, value: string) => value.trim().length >= (form[name].validation.minLength?.value as number),
        maxLength: (name: string, value: string) => value.trim().length <= (form[name].validation.maxLength?.value as number),
        pattern: (name: string, value: string) => (form[name].validation.pattern?.value as RegExp).test(value),
    }; // Static validation rules

    const isInputValid = React.useCallback((name: string, value: string) => {
        return Object.keys(form[name].validation).find((key) => {
            return !validationRules[key as keyof typeof validationRules](name, value);
        });
    }, [form]); // I don't know if useMemo is necessary cuz we change form on every onChange action

    const submitHandler = (cb: (data: { [key: string]: string }) => void) => {
        return (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            
            const errors = {};

            if (!isFormValid) {
                Object.values(form).forEach(({ name, validation, value }) => {
                    const errorKey = isInputValid(name, value);
                    errorKey && (errors[name] = { ...form[name], error: validation[errorKey].errorMessage });
                });
                
                setForm((prevState) => ({ ...prevState, ...errors }));
                return;
            }
            
            cb(Object.fromEntries(Object.entries(form).map(([_, { value, name }]) => [name, value])));
        }
    };

    const handleBlur = (name: string, { target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        const errorKey = isInputValid(name, value);

        setForm((prevState) => ({
            ...prevState,
            [name]: { ...prevState[name], error: errorKey ? prevState[name].validation[errorKey].errorMessage : null },
        }));
    };

    const handleChange = (name: string, { target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prevState) => ({ ...prevState, [name]: { ...prevState[name], value, dirty: true } }));
    };
    
    const isFormValid = React.useMemo(() => {
        return Object.values(form).every(({ name, validation, value }) => {
            return Object.keys(validation).every((key) => {
                return validationRules[key as keyof typeof validationRules](name, value);
            });
        });
    }, [form]); /* Grabbing every field from form and checking if it's valid by provided validation rules. 
                And i don't know if useMemo is necessary cuz we change form on every onChange action */

    return {
        submitHandler,
        renderFields: () => renderField(Object.values(form), handleChange, handleBlur),
        isFormValid,
    };
};