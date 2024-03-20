import { TypographyProps } from "../../Typography/model/interfaces";

export interface AnimatedNumberProps extends TypographyProps {
    value: number;
    cb: (newValue: number) => string;
}
