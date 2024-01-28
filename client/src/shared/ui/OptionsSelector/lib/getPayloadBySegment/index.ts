import { ProductSelectorState, Size } from "@/shared/model/interfaces";

export const getPayloadBySegment = (segmentType: string, state: ProductSelectorState, index: number, availableValueIndex: number, data: Array<number | Size>) => {
    switch (segmentType) {
        case "SET_TYPE":
            return {
                ...state,
                type: index,
            };
        case "SET_SIZE":
            return {
                ...state,
                size: index,
                price: (data[availableValueIndex] as Size).price, 
            };
        default:
            return state;
    }
};