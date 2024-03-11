import cn from "@/shared/lib/classNames";
import { InfoItemProps } from "../../model/interfaces";

const InfoItem = ({ title, description }: InfoItemProps) => {
    return (
        <li className='flex w-full items-start'>
            <span className={cn("basis-[200px] text-gray-400", !!title.className && title.className)}>
                {title.value}
            </span>
            {description && (
                <p className={cn("font-medium w-[calc(100%-200px)]", !!description.className && description.className)}>
                    {description.value}
                </p>
            )}
        </li>
    );
};

export default InfoItem;