import React from "react";
import { Props } from "../model/interfaces";

const AddToCartButton = ({ title, initialCount, handleClick }: Props) => {
    const [count, setCount] = React.useState(initialCount ?? 0);

    const onClick = () => {
        setCount((prevState) => prevState + 1);
        handleClick();
    };

    return (
        <button
            onClick={onClick}
            type='button'
            className='active:scale-[0.98] group font-bold text-base text-white bg-primary-orange py-2 px-5 rounded-full flex items-center justify-center gap-2'
        >
            {title}
            {!!count && (
                <span className='min-w-[20px] min-h-[20px] flex items-center justify-center text-sm rounded-full bg-white text-primary-orange'>
                    {count}
                </span>
            )}
        </button>
    );
};

export default AddToCartButton;