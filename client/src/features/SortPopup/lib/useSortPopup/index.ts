import React from "react";

export const useSortPopup = () => {
    const [opened, setOpened] = React.useState(false);

    const listRef = React.useRef<HTMLUListElement>(null);
    const spanRef = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        const handleOutsideClick = ({ target }: MouseEvent) => {
            target !== listRef.current && target !== spanRef.current && setOpened(false);
        };

        const handleKeyup = ({ key }: KeyboardEvent) => {
            key === "Escape" && setOpened(false);
        };

        document.addEventListener("keyup", handleKeyup);
        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("keyup", handleKeyup);
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    return { opened, setOpened, listRef, spanRef };
};