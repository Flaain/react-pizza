import React from "react";
import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";
import { animate, useMotionValue } from "framer-motion";

export const useAnimatedPrice = (from: number, to: number) => {
    const priceRef = React.useRef<HTMLSpanElement | null>(null);

    const price = useMotionValue(from);

    React.useEffect(() => {
        const controls = animate(price, to, {
            duration: 0.5,
            onUpdate: (latest) => {
                priceRef.current && (priceRef.current.textContent = `от ${getIntlPrice(latest)}`);
            },
        });

        return controls.stop;
    }, [price, to]);

    return { price, priceRef };
};