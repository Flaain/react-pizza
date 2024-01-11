import React from "react";
import { ErrorsState, Field, Validation } from "./types";
import { validationRules } from "./utils/staticValidationRules";

/* 
    Just a quick remark. It's my second version of this comment, i decided to use target: { name } anyway but it's kinda buggy.
    If u know some better solution please feel free to make a pull request i will really appreciate you
*/

export const useForm = () => {
    const [form, setForm] = React.useState<Record<string, Field>>({});
    const [errors, setErrors] = React.useState<ErrorsState>({});

    const isInputValid = React.useCallback((name: string, value: string) => {
        return Object.keys(form[name].validation).find((key) => {
            return !validationRules[key as keyof typeof validationRules]({
                name,
                currentValue: value,
                validationValue: form[name].validation[key as keyof Validation]?.value,
                matchWith: form[form[name].validation?.match?.matchWith]?.value
            });
        });
    }, [form]); // I don't know if useCallback is necessary cuz we change form on every onChange action

    const register = (field: Field) => {
        !form[field.name] && setForm((prevState) => ({ ...prevState, [field.name]: field }));

        return {
            name: field.name,
            value: form[field.name]?.value ?? field.value,
            onBlur: handleBlur,
            onChange: handleChange,
            onFocus: handleFocus,
        };
    };

    const handleFocus = ({ target: { name } }: React.FocusEvent<HTMLInputElement>) => {
        !form[name]?.isDirty && setForm((prevState) => ({ ...prevState, [name]: { ...form[name], isDirty: true } }));
    };

    const submitHandler = (cb: (data: Record<string, string>) => void) => {
        return (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            if (!isFormValid) {
                const errors: ErrorsState = {};

                Object.values(form).forEach(({ name, validation, value }) => {
                    const errorKey = isInputValid(name, value);
                    errorKey && (errors[name] = validation[errorKey as keyof Validation]?.errorMessage as string);
                });

                setErrors((prevState) => ({ ...prevState, ...errors }));
                return;
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            cb(Object.fromEntries(Object.entries(form).map(([_, { name, value }]) => [name, value])));
        };
    };

    const handleBlur = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const errorKey = isInputValid(name, value);

        setErrors((prevState) => ({
            ...prevState,
            [name]: errorKey && form[name]?.isDirty ? form[name]?.validation[errorKey as keyof Validation]!.errorMessage : null,
        }));
    };

    const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm((prevState) => ({ ...prevState, [name]: { ...prevState[name], value } }));
    };

    const isFormValid = React.useMemo(() => {
        return Object.values(form).every(({ name, validation, value }) => {
            return Object.keys(validation).every((key) => {
                return validationRules[key as keyof typeof validationRules]({
                    name,
                    currentValue: value,
                    validationValue: validation[key as keyof Validation]?.value,
                    matchWith: form[validation.match?.matchWith]?.value,
                });
            });
        });
    }, [form]);

    return {
        submitHandler,
        register,
        isFormValid,
        errors,
    };
};