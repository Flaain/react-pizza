import { Size } from "@/shared/api/interfaces";
import { SegmentFunction, SegmentType } from "./interfaces";

export const sizeSelector = (initialValue: number, { size: availableSize }: Size) => availableSize === initialValue;
export const typeSelector = (_: string, availableType: number, index: number) => availableType === index;

export const segmentSelectors: Record<SegmentType, SegmentFunction> = {
    "SET_TYPE": typeSelector,
    "SET_SIZE": sizeSelector,
};