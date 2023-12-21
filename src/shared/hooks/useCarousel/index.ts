import React from "react";
import { Props } from "./interfaces";

const useCarousel = ({ items, scrollRef, options }: Props) => {
    const [position, setPosition] = React.useState(0);
    const [itemWidth, setItemWidth] = React.useState(0);

    const { gap, slidesToScroll, slidesToShow } = React.useMemo(() => options ?? { slidesToShow: 1, gap: 30, slidesToScroll: 5 }, [options]);

    const isPrevDisabled = position <= 0;
    const isNextDisabled = Math.abs(position) >= (items.length - slidesToShow) * (itemWidth + gap);

    React.useEffect(() => {
        scrollRef.current && setItemWidth(scrollRef.current.getBoundingClientRect().width / slidesToShow - gap);
    }, []);

    const handlePrev = () => {
        const itemsLeft = Math.abs(position) / (itemWidth + gap);
        setPosition((prevState) => prevState + (itemsLeft >= slidesToScroll ? slidesToScroll * (itemWidth + gap) : itemsLeft * (itemWidth + gap)));
    };

    const handleNext = () => {
        const itemsLeft = Math.floor(items.length - (Math.abs(position) + slidesToShow * (itemWidth + gap)) / itemWidth + gap);
        setPosition((prevState) => prevState - (itemsLeft >= slidesToScroll ? slidesToScroll * (itemWidth + gap) : itemsLeft * (itemWidth + gap)));
    };

    /**
     * 
     * @param {string} direction direction in which we need to add an additional position.
     * @param {number} additional additional number to main position.
     * @param {boolean} condition only if condition true additional will apply to main position.
     */

    const handleMouseEnter = (direction: "prev" | "next", additional: number, condition: boolean) => {
        const positionAdditional = direction === "next" ? position - additional : position + additional;
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
        handlePrev,
        handleNext,
        handleMouseEnter,
        handleMouseLeave
    }
};

export default useCarousel;