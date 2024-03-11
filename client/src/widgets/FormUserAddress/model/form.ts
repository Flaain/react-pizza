import { Form } from "@/shared/model/interfaces";

export const form: { [key: string]: Form } = {
    city: {
        name: "city",
        label: "Введите город",
        type: "text",
        validation: {
            required: { errorMessage: "Поле обязательно для заполнения" },
            minLength: { value: 5, errorMessage: "Минимальная длина поля - 5 символов" },
            maxLength: { value: 20, errorMessage: "Максимальная длина поля - 20 символов" },
        },
    },
    state: {
        name: "state",
        label: "Введите область",
        type: "text",
        validation: {
            required: { errorMessage: "Поле обязательно для заполнения" },
            minLength: { value: 5, errorMessage: "Минимальная длина поля - 5 символов" },
            maxLength: { value: 20, errorMessage: "Максимальная длина поля - 20 символов" },
        },
    },
    line: {
        name: "line",
        label: "Введите адрес",
        type: "text",
        validation: {
            required: { errorMessage: "Поле обязательно для заполнения" },
            minLength: { value: 5, errorMessage: "Минимальная длина поля - 5 символов" },
        },
    },
    postal_code: {
        name: "postal_code",
        label: "Введите почтовый индекс",
        type: "number",
        validation: {
            required: { errorMessage: "Поле обязательно для заполнения" },
            minLength: { value: 5, errorMessage: "Минимальная длина поля - 5 символов" },
            pattern: {
                value: /^[0-9]*$/,
                errorMessage: "Допустимы только цифры",
            },
        },
    },
    // building: {
    //     name: "building",
    //     label: "Введите здание, корпус или офис",
    //     type: "number",
    //     validation: {
    //         required: { errorMessage: "Поле обязательно для заполнения" },
    //         maxLength: { value: 5, errorMessage: "Максимальная длина поля - 5 символов" },
    //         pattern: {
    //             value: /^\d+$/,
    //             errorMessage: "Допустимы только цифры",
    //         },
    //     },
    // },
};