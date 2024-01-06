export type ValidationRules = "minLength" | "maxLength" | "required" | "pattern";

export type FormObj = Record<string, Field>;

export type Validation = {
    [key in ValidationRules]?: {
        value?: unknown;
        errorMessage: string;
    };
};

export type ErrorsState = Record<string, string | null>;

export interface Field {
    name: string;
    value: string;
    isDirty: boolean;
    validation: Validation;
}

export interface Options {
    [key: string]: Field;
}

export interface StaticValidationRulesArgs {
    name: string;
    value: string;
    validation?: Validation;
}