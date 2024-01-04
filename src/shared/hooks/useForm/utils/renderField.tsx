import { Field } from "../types";

export const renderField = (
    fields: Array<Field>,
    handleChange: (name: string, event: React.ChangeEvent<HTMLInputElement>) => void,
    handleBlur: (name: string, event: React.ChangeEvent<HTMLInputElement>) => void,
    attributes?: React.InputHTMLAttributes<HTMLInputElement>
) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return fields.map(({ validation, dirty, label, error, ...field }) => (
        <label className='flex flex-col gap-2' key={field.name}>
            {label && <span className='text-primary-black'>{label}</span>}
            <input
                {...attributes}
                {...field}
                onChange={(event) => handleChange(field.name, event)}
                onBlur={(event) => handleBlur(field.name, event)}
                className='border border-solid border-primary-gray px-5 py-2 rounded-lg outline-gray-200'
            />
            {error && <span className='text-red-500 text-sm'>{error}</span>}
        </label>
    ));
};
