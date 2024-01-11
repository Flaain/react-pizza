export type ValidationRules = "minLength" | "maxLength" | "required" | "pattern" | "match";

export type FormObj = Record<string, Field>;

export type Validation = {
    [key in ValidationRules]?: {
        value?: unknown;
        matchWith?: string;
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
    currentValue: string;
    matchWith: string;
    validationValue?: unknown;
}