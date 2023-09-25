export interface Props {
    availableTypes: Array<number>;
    availableSizes: Array<number>;
    type: number;
    size: number;
    initialPrice: number;
    handleChange: ({ type, payload }) => void;
}