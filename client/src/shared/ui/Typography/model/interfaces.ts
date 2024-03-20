import React from "react";

export type TypographyAsTag = "h1" | "h2" | "h3" | "p" | "span";
export type TypographyVariant = "default" | "primary" | "secondary" | "accent" | "description";
export type TypographySize = "default" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
export type TypographyWeight = "normal" | "medium" | "semibold" | "bold" | "extrabold";
export type TypographyAlign = "left" | "center" | "right";

export interface TypographyVariants {
    variant: Record<TypographyVariant, string>;
    size: Record<TypographySize, string>;
    weight: Record<TypographyWeight, string>;
}

interface BaseTypographyProps {
    variant?: TypographyVariant;
    size?: TypographySize;
    weight?: TypographyWeight;
    align?: TypographyAlign;
}

export type PolymorphicRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>["ref"];

type PropsOf<T extends React.ElementType> = React.ComponentPropsWithRef<T>;

type PolymorphicProps<T extends React.ElementType = React.ElementType, TProps = object> = {
    as?: T;
} & TProps &
    Omit<PropsOf<T>, keyof TProps | "as" | "ref"> & { ref?: PolymorphicRef<T> };


export type TypographyProps<T extends React.ElementType = "span"> = PolymorphicProps<T, BaseTypographyProps>;

export type TypographyComponent = <T extends React.ElementType = "span">(props: PolymorphicProps<T, TypographyProps<T>>) => React.ReactNode;
