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
    validateOnChange?: boolean;
    ref?: React.RefObject<HTMLInputElement>;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Options {
    provideFormValues?: boolean;
}

export interface StaticValidationRulesArgs {
    name: string;
    currentValue: string;
    matchWith: string;
    validationValue?: unknown;
}

export interface RegisterOptions {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    validateOnChange?: boolean;
}

export interface LinkedValues {
    [key: string]: unknown; // i know it's bad need to fix it
    
    onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
    onBlur?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
    onFocus?: ((event: React.ChangeEvent<FocusEvent>) => void) | undefined;
}