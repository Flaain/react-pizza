import cn from "@/shared/lib/classNames";
import { LayoutGroup, motion } from "framer-motion";
import { OptionsSelectorProps } from "@/shared/model/interfaces";

const OptionsSelector = ({ options, onOptionChange, layoutId }: OptionsSelectorProps) => {
    return (
        <LayoutGroup id={layoutId}>
            <ul className='grid' style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
                {options.map(({ id, label, isAvailable, isActive }) => {
                    return (
                        <li className='relative' key={id}>
                            {isActive && (
                                <motion.span
                                    layoutId='options-selector'
                                    className='absolute inset-0 z-10 bg-white rounded-lg'
                                    transition={{ ease: "easeInOut", duration: 0.3 }}
                                />
                            )}
                            <label
                                className={cn(
                                    "px-9 py-2 rounded-lg flex items-center justify-center text-primary-black text-sm max-md:text-base font-bold transition-shadow duration-200 ease-in-out",
                                    isAvailable ? "cursor-pointer" : "opacity-50 cursor-default"
                                )}
                            >
                                <span className='z-50'>{label}</span>
                                <input
                                    type='radio'
                                    name='type'
                                    className='sr-only'
                                    value={label}
                                    checked={isActive}
                                    disabled={!isAvailable}
                                    {...(isAvailable && { onChange: () => onOptionChange(id) })}
                                />
                            </label>
                        </li>
                    );
                })}
            </ul>
        </LayoutGroup>
    );
};

export default OptionsSelector;