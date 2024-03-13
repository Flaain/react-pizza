import React from "react";

export const useTabSlider = <T extends HTMLElement>(initialActiveIndex: number) => {
    const [activeTabIndex, setActiveTabIndex] = React.useState(initialActiveIndex);
    const [tabWidth, setTabWidth] = React.useState<number | null>(null);
    const [tabLeft, setTabLeft] = React.useState<number | null>(null);

    const tabRef = React.useRef<Array<T | null>>([]);

    React.useEffect(() => {
        if (tabRef.current[activeTabIndex]) {
            const { offsetLeft, clientWidth } = tabRef.current[activeTabIndex] as T;

            setTabWidth(clientWidth);
            setTabLeft(offsetLeft);
        }
    }, [activeTabIndex]);

    return {
        activeTabIndex,
        tabWidth,
        tabLeft,
        tabRef,
        setActiveTabIndex,
    };
};