export type ValidationRules = "minLength" | "maxLength" | "required" | "pattern";

export type FormObj = { [key: string]: Field }

export type Validation = {
    [key in ValidationRules]?: {
        value?: unknown;
        errorMessage?: string;
    };
};

export interface Field {
    name: string;
    value: string;
    label?: string;
    dirty: boolean;
    error?: string;
    type: "text" | "number" | "email" | "password";
    validation: Validation;
}

export interface Options {
    [key: string]: Field;
}