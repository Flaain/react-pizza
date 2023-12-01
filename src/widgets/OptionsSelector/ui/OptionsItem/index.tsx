import cn from "@/shared/lib/classNames";
import { OptionsItemProps } from "../../model/interfaces";

const OptionsItem: React.FC<OptionsItemProps> = ({ availableValueIndex, tabRef, index, handleChange, title, checked }) => {
    return (
        <li>
            <label
                ref={(element) => (tabRef.current[index] = element)}
                className={cn(
                    "px-9 py-2 rounded-lg flex items-center justify-center text-primary-black text-sm max-md:text-base font-bold transition-shadow duration-200 ease-in-out",
                    availableValueIndex !== -1 ? "cursor-pointer" : "opacity-50 cursor-default"
                )}
            >
                {title}
                <input
                    type='radio'
                    name='type'
                    className='sr-only'
                    value={title}
                    checked={checked}
                    disabled={availableValueIndex === -1}
                    {...(availableValueIndex !== -1 && { onChange: () => handleChange(index, availableValueIndex) })}
                />
            </label>
        </li>
    );
};

export default OptionsItem;
