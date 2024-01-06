import cn from "@/shared/lib/classNames";
import { positions } from "@/shared/config/constants";

const Spinner = ({ position }: { position: "top" | "center" | "bottom" }) => {
    return (
        <span
            className={cn(
                `absolute left-[50%] ${positions[position]} w-[50px] animate-loading h-[50px] border-[5px] border-t-transparent border-solid border-primary-orange rounded-full flex items-center justify-center`
            )}
        ></span>
    );
};

export default Spinner;