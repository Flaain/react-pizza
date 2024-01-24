export type ValidationRules = "minLength" | "maxLength" | "required" | "pattern" | "match";

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
    type?: string;
    isDirty: boolean;
    validation?: Validation;
}

export interface Options {
    validateOnChange?: boolean;
}

export interface StaticValidationRulesArgs {
    name: string;
    currentValue: string;
    matchWith: string;
    validationValue?: unknown;
}

export interface RegisterOptions {
    watch?: boolean;
}