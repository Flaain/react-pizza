import { EMAIL_REGEXP } from "@/shared/config/constants";
import { Form } from "@/shared/model/interfaces";


const repatedFields: Record<string, Form> = {
    email: {
        name: "email",
        label: "Введите почту",
        type: "text",
        validation: {
            required: { errorMessage: "Поле обязательно для заполнения" },
            pattern: { value: EMAIL_REGEXP, errorMessage: "Пожалуйста, введите корректный адрес электронной почты" },
        },
    },
    password: {
        name: "password",
        label: "Введите пароль",
        type: "password",
        validation: {
            required: { errorMessage: "Поле обязательно для заполнения" },
            minLength: { value: 5, errorMessage: "Минимальная длина поля - 5 символов" },
        },
    },
};

export const signinform: Record<string, Form> = {
    email: repatedFields.email,
    password: repatedFields.password,
};

export const signupform: Record<string, Form> = {
    email: repatedFields.email,
    password: repatedFields.password,
    name: {
        name: "name",
        label: "Введите имя",
        validation: {
            required: { errorMessage: "Поле обязательно для заполнения" },
            minLength: { value: 3, errorMessage: "Минимальная длина поля - 3 символа" },
            maxLength: { value: 20, errorMessage: "Максимальная длина поля - 20 символов" },
        },
    },
    confirmPassword: {
        name: "confirmPassword",
        label: "Повторите пароль",
        type: "password",
        validation: { ...repatedFields.password.validation, match: { value: "password", errorMessage: "Пароль не совпадает" } },
    },
};