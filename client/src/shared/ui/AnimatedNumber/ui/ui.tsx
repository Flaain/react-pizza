import React from "react";
import Typography from "../../Typography/ui/ui";
import { useSpring, useTransform } from "framer-motion";
import { AnimatedNumberProps } from "../model/interfaces";

const AnimatedNumber = <T extends HTMLElement>({ value, cb, ...rest }: AnimatedNumberProps) => {
    const ref = React.useRef<T>(null);
    const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });

    useTransform(spring, (current) => {
        ref.current && (ref.current.textContent = cb(current));
        return Math.round(current).toLocaleString();
    });

    React.useLayoutEffect(() => {
        ref.current && (ref.current.textContent = cb(value));
    }, []);

    React.useEffect(() => {
        spring.set(value);
    }, [spring, value]);

    return (
        <Typography ref={ref} {...rest}>
            {ref.current?.textContent}
        </Typography>
    );
};

export default AnimatedNumber;