import { Size } from "@/shared/api/interfaces";
import { Segment } from "./interfaces";
import { ProductSelectorTypes } from "@/entities/Product/model/interfaces";

export const sizeSelector = (initialValue: number, { size: availableSize }: Size) => availableSize === initialValue;
export const typeSelector = (_: string, availableType: number, index: number) => availableType === index;

export const segmentSelectors: Record<ProductSelectorTypes, Segment> = {
    SET_TYPE: { availableValueIndex: typeSelector },
    SET_SIZE: {
        availableValueIndex: sizeSelector,
        title: (size: number) => new Intl.NumberFormat(navigator.language, { style: "unit", unit: "centimeter", unitDisplay: "short" }).format(size),
    },
};