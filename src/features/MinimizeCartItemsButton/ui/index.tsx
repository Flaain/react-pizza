import React from "react";
import cn from "../../../shared/lib/classNames";
import getImageUrl from "../../../shared/lib/helpers/getImageUrl";

const MinimizeCartItemsButton = () => {
    return (
        <button
            disabled={orderLoading}
            onClick={() => setMinimizeCartItems((prevState) => !prevState)}
            title={minimizeCartItems ? "показать товары" : "скрыть товары"}
        >
            <img
                className={cn("outline-none", minimizeCartItems ? "-rotate-90" : "rotate-90")}
                src={getImageUrl("arrow.svg")}
                alt={minimizeCartItems ? "показать товары" : "скрыть товары"}
            />
        </button>
    );
};

export default MinimizeCartItemsButton;