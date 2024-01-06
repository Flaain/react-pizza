import { StaticValidationRulesArgs } from "../types";

export const validationRules: Record<string, (args: StaticValidationRulesArgs) => boolean> = {
    required: ({ value }) => !!value.trim().length,
    minLength: ({ value, validation }) => value.trim().length >= (validation?.minLength?.value as number),
    maxLength: ({ value, validation }) => value.trim().length <= (validation?.maxLength?.value as number),
    pattern: ({ value, validation }) => (validation?.pattern?.value as RegExp).test(value),
};