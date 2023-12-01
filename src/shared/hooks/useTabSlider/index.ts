import React from "react";

const useTabSlider = (initialActiveIndex: number) => {
    const [activeTabIndex, setActiveTabIndex] = React.useState(initialActiveIndex);
    const [tabWidth, setTabWidth] = React.useState<number | null>(null);
    const [tabLeft, setTabLeft] = React.useState<number | null>(null);

    const tabRef = React.useRef<Array<HTMLLabelElement | null>>([]);

    React.useEffect(() => {
        if (tabRef.current[activeTabIndex]) {
            const { offsetLeft, clientWidth } = tabRef.current[activeTabIndex] as HTMLLabelElement;

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

export default useTabSlider;