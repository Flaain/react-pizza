import cn from "@/shared/lib/classNames";
import { AuthButtonProps } from "../../model/interfaces";

const AuthButton = ({ title, ...rest }: AuthButtonProps) => {
    return (
        <button
            {...rest}
            className={cn(
                "py-3 rounded-full text-white bg-primary-orange mt-5 transition-opacity duration-200 ease-in-out",
                rest.disabled! && "opacity-50 cursor-default"
            )}
        >
            {title}
        </button>
    );
};

export default AuthButton;