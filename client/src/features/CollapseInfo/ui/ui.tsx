import React from "react";
import cn from "@/shared/lib/classNames";
import Typography from "@/shared/ui/Typography/ui/ui";
import { Props } from "../model/interfaces";

const CollapseInfo = ({ description, MAX_LENGTH = 100, title }: Props) => {
    const [expanded, setExpanded] = React.useState(description.length <= MAX_LENGTH);

    return (
        <div className='flex flex-col gap-5 items-start'>
            <div
                className={cn(
                    "flex flex-col gap-2 relative",
                    !expanded &&
                        "after:absolute after:bg-gradient-to-b after:from-[#ffffff00] after:to-white after:h-[50px] after:bottom-0 after:w-full"
                )}
            >
                <Typography as='h3' size='md' weight='medium'>
                    {title}
                </Typography>
                <Typography className={cn("max-w-[700px]", !expanded && "max-h-[70px] overflow-hidden")}>
                    {description}
                </Typography>
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