import { Pizza } from "../../../shared/api/interfaces";
import { PizzaState } from "../../../widgets/PriceBlock/lib/utils/interfaces";

export interface Props {
    tabsRef: React.MutableRefObject<Array<HTMLLabelElement | null>>;
    index: number;
    size: number;
    handleSizeChange: (size: number, index: number, availableSizeIndex: number) => void
    state: PizzaState;
    activeItem: Pizza;
}