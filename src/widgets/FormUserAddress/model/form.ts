import { FormObj } from "@/shared/hooks/useForm/types";

export const form: FormObj = {
    city: {
        name: "city",
        value: "",
        label: "Введите город",
        type: "text",
        dirty: false,
        validation: {
            required: {
                errorMessage: "Поле обязательно для заполнения",
            },
            minLength: {
                value: 3,
                errorMessage: "Минимальная длина города - 3 символа",
            },
            maxLength: {
                value: 20,
                errorMessage: "Максимальная длина города - 20 символов",
            },
        },
    },
    address: {
        name: "address",
        value: "",
        label: "Введите адрес",
        type: "text",
        dirty: false,
        validation: {
            required: {
                errorMessage: "Поле обязательно для заполнения",
            },
            minLength: {
                value: 5,
                errorMessage: "Минимальная длина адреса - 5 символов",
            },
        },
    },
    building: {
        name: "building",
        value: "",
        label: "Введите номер дома, корпуса или офиса",
        type: "text",
        dirty: false,
        validation: {
            required: {
                errorMessage: "Поле обязательно для заполнения",
            },
            minLength: {
                value: 1,
                errorMessage: "Минимальная длина - 3 символа",
            },
            maxLength: {
                value: 5,
                errorMessage: "Максимальная длина - 5 символов",
            },
            pattern: {
                value: /^\d+$/,
                errorMessage: "Поле должно содержать только цифры",
            }
        },
    },
};