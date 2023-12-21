import React from "react";
import cn from "../../../shared/lib/classNames";
import { Props } from "../interfaces";

const CollapseInfo: React.FC<Props> = ({ description, MAX_LENGTH = 100, title }) => {
    const [expanded, setExpanded] = React.useState(description.length <= MAX_LENGTH ?? false);

    // React.useEffect(() => setExpanded(description.length <= MAX_LENGTH ?? false), [description])

    return (
        <div className='flex flex-col gap-5 items-start'>
            <div
                className={cn(
                    "flex flex-col gap-2 relative",
                    !expanded &&
                        "after:absolute after:bg-gradient-to-b after:from-[#ffffff00] after:to-white after:h-[50px] after:bottom-0 after:w-full"
                )}
            >
                <h3 className='text-primary-black text-base font-medium'>{title}</h3>
                <p className={cn("max-w-[700px]", !expanded && "max-h-[70px] overflow-hidden")}>{description}</p>
            </div>
            {description.length > MAX_LENGTH && (
                <button
                    className='text-primary-black border-b border-dashed hover:text-primary-orange hover:border-primary-orange'
                    onClick={() => setExpanded((prevState) => !prevState)}
                >
                    {expanded ? "Свернуть" : "Развернуть"} {title.toLowerCase()}
                </button>
            )}
        </div>
    );
};

export default CollapseInfo;