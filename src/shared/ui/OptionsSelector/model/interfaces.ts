import { PayloadAction } from "@reduxjs/toolkit";
import { Size } from "@/shared/api/interfaces";
import { ProductSelectorState } from "@/entities/Product/model/interfaces";

export type SegmentType = "SET_TYPE" | "SET_SIZE";

export interface Segment {
    availableValueIndex: (initial: number | string, available: unknown, index: number) => boolean,
    title?: (value: unknown) => string
}

export interface SegmentResult {
    checked: boolean;
    index: number;
    title: string;
    availableValueIndex: number;
    additional?: string;
}

export interface OptionsSelectorProps {
    state: ProductSelectorState;
    types: Array<number>;
    sizes: Array<Size>;
    price: number;
    handleChange: ({ type, payload }: PayloadAction<ProductSelectorState>) => void;
}

export interface OptionsListProps {
    segmentType: SegmentType;
    stateProperty: string;
    initial: Array<number | string>;
    state: ProductSelectorState;
    data: Array<number | Size>;
    classNames?: string;
    dispatch: ({ type, payload }: PayloadAction<ProductSelectorState>) => void;
}

export interface OptionsItemProps {
    tabRef: React.MutableRefObject<(HTMLLabelElement | null)[]>;
    index: number;
    title: string;
    availableValueIndex: number;
    checked: boolean;
    handleChange: (index: number, availableValue: number) => void;
}