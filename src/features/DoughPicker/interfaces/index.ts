export interface Props {
    availableTypes: Array<number>;
    type: number;
    handleChange: ({ type, payload }) => void;
}