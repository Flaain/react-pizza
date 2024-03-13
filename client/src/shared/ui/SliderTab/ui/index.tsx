import cn from "@/shared/lib/classNames";
import { Props } from "../model/interfaces";

const SliderTab = ({ tabLeft, tabWidth, shadow = true }: Props) => {
    return (
        <span
            className='absolute bottom-0 top-0 flex transition-all duration-300 py-1'
            {...(tabWidth && tabLeft && { style: { left: tabLeft, width: tabWidth } })}
        >
            <span className={cn("h-full w-full rounded-lg bg-white box-border z-50", shadow && "shadow-md")}></span>
        </span>
    );
};

export default SliderTab;