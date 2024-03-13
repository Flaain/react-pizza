import cn from "@/shared/lib/classNames";

const TabsContent = ({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div {...rest} className={cn(!!className && className)}>
            {children}
        </div>
    )
}

export default TabsContent;