import cn from "@/shared/lib/classNames";
import { Props } from "../model/interfaces";

const AddToCartButton = ({ title, quantity, loading, ...rest }: Props) => {
    return (
        <button
            {...rest}
            type='button'
            className={cn(
                "active:scale-[0.98] min-w-[120px] min-h-[40px] relative group font-bold text-base text-white bg-primary-orange py-2 px-5 rounded-full flex items-center justify-center gap-5"
            )}
        >
            {loading ? (
                <span
                    className={cn(
                        `w-[20px] animate-loadingStatic h-[20px] border-[3px] border-t-transparent border-solid border-primary-gray rounded-full`
                    )}
                ></span>
            ) : (
                title
            )}
            {!!quantity && (
                <span className='min-w-[20px] min-h-[20px] flex items-center justify-center text-sm rounded-full bg-white text-primary-orange'>
                    {quantity}
                </span>
            )}
        </button>
    );
};

export default AddToCartButton;