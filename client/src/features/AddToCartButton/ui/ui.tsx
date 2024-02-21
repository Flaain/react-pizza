import { Props } from "../model/interfaces";

const AddToCartButton = ({ title, quantity, handleClick }: Props) => {
    return (
        <button
            onClick={handleClick}
            type='button'
            className='active:scale-[0.98] group font-bold text-base text-white bg-primary-orange py-2 px-5 rounded-full flex items-center justify-center gap-2'
        >
            {title}
            {!!quantity && (
                <span className='min-w-[20px] min-h-[20px] flex items-center justify-center text-sm rounded-full bg-white text-primary-orange'>
                    {quantity}
                </span>
            )}
        </button>
    );
};

export default AddToCartButton;