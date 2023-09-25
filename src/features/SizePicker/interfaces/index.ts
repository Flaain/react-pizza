export interface Props {
    availableSizes: Array<number>;
    size: number;
    initialPrice: number;
    handleChange: ({ type, payload }) => void;
}