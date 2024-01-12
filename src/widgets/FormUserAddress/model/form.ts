import { Form } from "./interfaces";

export const form: { [key: string]: Form } = {
    city: {
        name: "city",
        label: "Введите город",
        value: "",
        isDirty: false,
        validation: {
            required: { errorMessage: "Поле обязательно для заполнения" },
            minLength: { value: 5, errorMessage: "Минимальная длина поля - 5 символов" },
            maxLength: { value: 20, errorMessage: "Максимальная длина поля - 20 символов" },
        },
    },
    address: {
        name: "address",
        label: "Введите адрес",
        value: "",
        isDirty: false,
        validation: {
            required: { errorMessage: "Поле обязательно для заполнения" },
            minLength: { value: 5, errorMessage: "Минимальная длина поля - 5 символов" },
            match: { errorMessage: "Поле адрес должно совпадать с полем город", matchWith: "city" }
        },
    },
    postcode: {
        name: "postcode",
        label: "Введите почтовый индекс",
        value: "",
        isDirty: false,
        validation: {
            required: { errorMessage: "Поле обязательно для заполнения" },
            minLength: { value: 5, errorMessage: "Минимальная длина поля - 5 символов" },
            pattern: {
                value: /^\d+$/,
                errorMessage: "Допустимы только цифры",
            },
        },
    },
    building: {
        name: "building",
        label: "Введите здание, корпус или офис",
        value: "",
        isDirty: false,
        validation: {
            required: { errorMessage: "Поле обязательно для заполнения" },
            maxLength: { value: 5, errorMessage: "Максимальная длина поля - 5 символов" },
            pattern: {
                value: /^\d+$/,
                errorMessage: "Допустимы только цифры",
            },
        },
    },
};