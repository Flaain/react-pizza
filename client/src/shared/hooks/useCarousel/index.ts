import React from "react";
import { Props } from "./interfaces";

const useCarousel = ({ items, scrollRef, options }: Props) => {
    const [position, setPosition] = React.useState(0);
    const [itemWidth, setItemWidth] = React.useState(0);
    
    const { gap, slidesToScroll, slidesToShow } = React.useMemo(() => options ?? { slidesToShow: 5, gap: 30, slidesToScroll: 1 }, [options]);
    
    const itemWidthPlusGap = itemWidth + gap;
    
    const isPrevDisabled = position === 0;
    const isNextDisabled = Math.abs(position) >= (items.length - slidesToShow) * itemWidth;
    
    const handlePrev = () => {
        const itemsLeft = Math.floor(Math.abs(position) / (itemWidth + gap));
        setPosition((prevState) => prevState + (itemsLeft >= slidesToScroll ? slidesToScroll * itemWidthPlusGap : itemsLeft * itemWidthPlusGap));
    };
    
    const handleNext = () => {
        const itemsLeft = Math.floor(items.length - (Math.abs(position) + slidesToShow * itemWidthPlusGap) / itemWidthPlusGap);
        setPosition((prevState) => prevState - (itemsLeft >= slidesToScroll ? slidesToScroll * itemWidthPlusGap : itemsLeft * itemWidthPlusGap));
    };

    React.useLayoutEffect(() => {
        scrollRef.current && setItemWidth(Math.round(scrollRef.current.getBoundingClientRect().width / slidesToShow - gap));
    }, []);

    /**
     * 
     * @param {string} direction direction in which we need to add an additional position.
     * @param {number} additional additional number to main position.
     * @param {boolean} condition only if condition true additional will apply to main position.
     */

    const handleMouseEnter = (direction: "prev" | "next", additional: number, condition: boolean) => {
        const positionAdditional = direction === "next" ? position - (additional + gap) : position + additional + gap;
        condition && scrollRef.current && (scrollRef.current.style.transform = `translateX(${positionAdditional}px)`);
    };

    const handleMouseLeave = () => {
        scrollRef.current && (scrollRef.current.style.transform = `translateX(${position}px)`);
    };

    return {
        position,
        itemWidth,
        isPrevDisabled,
        isNextDisabled,
        gap,
        handlePrev,
        handleNext,
        handleMouseEnter,
        handleMouseLeave
    }
};

export default useCarousel;