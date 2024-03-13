import React from "react";
import cn from "@/shared/lib/classNames";

const TabsTrigger = React.forwardRef(({ children, className, ...rest }: React.HTMLAttributes<HTMLLIElement>, ref: React.Ref<HTMLLIElement>) => {
    return (
        <li ref={ref} {...rest} className={cn(!!className && className)}>
            {children}
        </li>
    );
});

export default TabsTrigger;