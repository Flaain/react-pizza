import cn from "@/shared/lib/classNames";
import { Props } from "../model/interfaces";

const SliderTab: React.FC<Props> = ({ tabLeft, tabWidth, shadow = true }) => {
    return (
        <span
            className='absolute bottom-0 top-0 flex transition-all duration-300 py-1'
            {...(tabWidth && tabLeft && { style: { left: tabLeft, width: tabWidth } })}
        >
            <span className={cn("h-full w-full rounded-lg bg-white box-border", shadow && "shadow-md")}></span>
        </span>
    );
};

export default SliderTab;