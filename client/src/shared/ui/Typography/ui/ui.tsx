import React from "react";
import cn from "@/shared/lib/classNames";
import { PolymorphicRef, TypographyComponent, TypographyProps, TypographyVariants } from "../model/interfaces";
import { typographyVariants } from "../model/variants";

const Typography: TypographyComponent = React.forwardRef(<T extends React.ElementType = "span">(props: TypographyProps<T>, ref: PolymorphicRef<T>) => {
    const { as, variant, size, children, weight, ...rest } = props;

    const Component = as ?? "span";

    return (
        <Component
            ref={ref}
            className={cn(
                "truncate",
                props.className,
                typographyVariants.variant[variant as keyof TypographyVariants["variant"]] ?? typographyVariants.variant.primary,
                typographyVariants.size[size as keyof TypographyVariants["size"]] ?? typographyVariants.size.default,
                typographyVariants.weight[weight as keyof TypographyVariants["weight"]] ?? typographyVariants.weight.normal,
            )}
            {...rest}
        >
            {children}
        </Component>
    )
});

export default Typography;