import React from "react";
import { ErrorsState, Field, LinkedValues, Options, RegisterOptions, Validation } from "./types";
import { validationRules } from "./utils/validationRules";
import { Form } from "@/shared/model/interfaces";

/* 
    Just a quick remark. It's my second version of this comment, i decided to use target: { name } anyway but it's kinda buggy.
    If u know some better solution please feel free to make a pull request i will really appreciate you
*/

export const useForm = ({ provideFormValues }: Options = {}) => {
    const [form, setForm] = React.useState<Record<string, Field>>({});
    const [errors, setErrors] = React.useState<ErrorsState>({});

    const linkedValues = React.useRef<Record<string, LinkedValues>>({});

    const isInputValid = React.useCallback((name: string, value: string) => {
        if (!form[name].validation) return null;
        /* dunno why typescript complain about form[name].validation can be undefined if i above this comment did a check condition on validation undefined.
        i decided to use "!" on every complain i think this is a bad practice but i really don't know. */
        return Object.keys(form[name].validation!).find((key) => {
            return !validationRules[key as keyof typeof validationRules]({
                name,
                currentValue: value,
                validationValue: form[name].validation![key as keyof Validation]?.value,
                matchWith: form[name].validation?.match?.value ? form[form[name].validation?.match?.value as string]?.value : "",
            });
        });
    }, [form]); // I don't know if useCallback is necessary cuz we change form on every onChange action

    
    const handleFocus = ({ target: { name } }: React.FocusEvent<HTMLInputElement>) => {
        !form[name]?.isDirty && setForm((prevState) => ({ ...prevState, [name]: { ...prevState[name], isDirty: true } }));
    };
    
    const submitHandler = (cb: (data: Record<string, string>) => void) => {
        return (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            
            if (!isFormValid) {
                const errors: ErrorsState = {};
                
                Object.values(form).forEach(({ name, validation, value }) => {
                    const errorKey = isInputValid(name, value);
                    errorKey && (errors[name] = validation![errorKey as keyof Validation]?.errorMessage as string);
                });
                
                setErrors((prevState) => ({ ...prevState, ...errors }));
                return;
            }
            
            cb(Object.fromEntries(Object.entries(form).map(([_, { name, value }]) => [name, value])));
            /*
            Maybe do filter ".filter(([_, { name }]) => name)" before map cuz user can easily change name of input 
            and after onChange this input will added to form. But "hacked" input will not have name provided from form object.
            Or just use destructuring assignment to send only fields that expect:
            
            -> bad: send(data) - data: { email: 'test@gmail.com', password: "qwerty123", undefined: "hacked" }
            -> good: const { email, password } = data; send({ email, password })
            */
        };
    };
    
    const handleBlur = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const errorKey = isInputValid(name, value);
        
        setErrors((prevState) => ({
            ...prevState,
            [name]: !!errorKey && form[name]?.isDirty ? form[name].validation![errorKey as keyof Validation]!.errorMessage : null,
        }));
    };
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = event;
        
        if (form[name]?.validateOnChange) {
            const errorKey = isInputValid(name, value);
            
            setErrors((prevState) => ({
                ...prevState,
                [name]: !!errorKey && form[name]?.isDirty ? form[name].validation![errorKey as keyof Validation]!.errorMessage : null,
            }));
        }

        setForm((prevState) => ({ ...prevState, [name]: { ...prevState[name], value } }));
        
        linkedValues.current[name]?.onChange?.(event)
    };
    
    const register = (field: Form, options: RegisterOptions = {} ) => {
        const value = form[field.name]?.value || field.value || "";

        !form[field.name] && setForm((prevState) => ({ ...prevState, [field.name]: { ...field, ...options, value, isDirty: false } }));

        linkedValues.current[field.name] = { ...options };

        return {
            name: field.name,
            value,
            // ...(field.validation?.pattern && { pattern: (field.validation.pattern.value as RegExp).toString().replace(/\//g, "") }),
            onBlur: handleBlur,
            onChange: handleChange,
            onFocus: handleFocus,
        };
    };
    
    const isFormValid = React.useMemo(() => {
        return Object.values(form).every(({ name, validation, value }) => {
            if (!validation) return true;

            return Object.keys(validation).every((key) => {
                return validationRules[key as keyof typeof validationRules]({
                    name,
                    currentValue: value,
                    validationValue: validation[key as keyof Validation]?.value,
                    matchWith: validation.match?.value ? form[validation.match?.value as string]?.value : "",
                });
            });
        });
    }, [form]); // like with "isInputValid useCallback" here i dunno too is useMemo necessary

    return {
        submitHandler,
        register,
        getFormValues: () => provideFormValues && Object.fromEntries(Object.entries(form).map(([_, { name, value }]) => [name, value])),
        isFormValid, 
        errors,
    };
};