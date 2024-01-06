import cn from "@/shared/lib/classNames";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import { Props } from "../../model/interfaces";

const MinimizeCartItemsButton = ({ minimizeCartItems, ...btn }: Props) => {
    return (
        <button {...btn}>
            <img
                className={cn("outline-none", minimizeCartItems ? "-rotate-90" : "rotate-90")}
                src={getImageUrl("arrow.svg")}
                alt={minimizeCartItems ? "показать товары" : "скрыть товары"}
            />
        </button>
    );
};

export default MinimizeCartItemsButton;