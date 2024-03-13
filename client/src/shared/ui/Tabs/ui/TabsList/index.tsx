import cn from "@/shared/lib/classNames";

const TabsList = ({ children, className, ...rest }: React.HTMLAttributes<HTMLUListElement>) => {
    return (
        <ul {...rest} className={cn("bg-primary-gray w-full p-1 rounded-lg grid grid-cols-2 gap-2 relative", !!className && className)}>
            {children}
        </ul>
    );
};

export default TabsList;