import { Action, ProductSelectorTypes } from "@/entities/Product/model/interfaces";
import { ProductSelectorState, Size } from "@/shared/model/interfaces";

export interface Segment {
    availableValueIndex: (initial: number | string, available: unknown, index: number) => boolean;
    title?: (value: unknown) => string;
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
    handleChange: ({ type, payload }: Action, availableValueIndex: number) => void;
}

export interface OptionsListProps {
    segmentType: ProductSelectorTypes;
    stateProperty: string;
    initial: Array<number | string>;
    state: ProductSelectorState;
    data: Array<number | Size>;
    classNames?: string;
    dispatch: ({ type, payload }: Action, availableValueIndex: number) => void;
}

export interface OptionsItemProps {
    tabRef: React.MutableRefObject<(HTMLLabelElement | null)[]>;
    index: number;
    title: string;
    availableValueIndex: number;
    checked: boolean;
    handleChange: (index: number, availableValue: number) => void;
}