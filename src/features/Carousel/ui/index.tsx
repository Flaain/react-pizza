import React from "react";
import RelatedItem from "../../RelatedItem/ui";
import cn from "../../../shared/lib/classNames";
import getImageUrl from "../../../shared/lib/helpers/getImageUrl";
import { Props } from "./interfaces";

const Carousel: React.FC<Props> = ({ items, title, slidesToShow = 5, slidesToScroll = 1, gap = 30 }) => {
    const [position, setPosition] = React.useState(0);
    const [minWidth, setMinWidth] = React.useState(0);

    const scrollRef = React.useRef<HTMLUListElement | null>(null);
    const isBackDisabled = position === 0;
    const isNextDisabled = Math.abs(position) >= (items.length - slidesToShow) * minWidth + gap;

    React.useEffect(() => setPosition(0), [items]);

    React.useEffect(() => {
        scrollRef.current && setMinWidth(scrollRef.current.getBoundingClientRect().width / slidesToShow - gap);
    }, [scrollRef]);

    const handlePrev = () => {
        const itemsLeft = Math.abs(position) / (minWidth + gap);
        setPosition((prevState) => prevState + (itemsLeft >= slidesToScroll ? slidesToScroll * minWidth + gap : itemsLeft * (minWidth + gap)));
    };

    const handleNext = () => {
        const itemsLeft = Math.floor(items.length - (Math.abs(position) + slidesToShow * minWidth + gap) / minWidth + gap);
        setPosition((prevState) => prevState - (itemsLeft >= slidesToScroll ? slidesToScroll * minWidth + gap : itemsLeft * (minWidth + gap)));
    };

    const handleMouseEnter = (direction: string, condition: boolean) => {
        const positionAdditional = direction === "next" ? position - 30 : position + 30;
        condition && scrollRef.current && (scrollRef.current.style.transform = `translateX(${positionAdditional}px)`);
    };

    const handleMouseLeave = () => {
        scrollRef.current && (scrollRef.current.style.transform = `translateX(${position}px)`);
    };

    return (
        <div className='w-full overflow-hidden'>
            <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-primary-black'>{title}</h2>

                <div className='hidden items-center justify-between gap-[10px] md:flex'>
                    <button
                        disabled={isBackDisabled}
                        onClick={handlePrev}
                        onMouseEnter={() => handleMouseEnter("prev", !isBackDisabled)}
                        onMouseLeave={handleMouseLeave}
                        className={cn(
                            "min-w-[30px] min-h-[30px] flex items-center justify-center rounded-full transition-opacity duration-200 ease-in-out",
                            isBackDisabled ? "opacity-50" : "bg-primary-gray"
                        )}
                    >
                        <img
                            className={cn(
                                "mr-[2px] transition-opacity duration-200 ease-in-out",
                                isBackDisabled && "opacity-50"
                            )}
                            src={getImageUrl("arrow.svg")}
                            alt='prev arrow'
                        />
                    </button>
                    <button
                        disabled={isNextDisabled}
                        onMouseEnter={() => handleMouseEnter("next", !isNextDisabled)}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleNext}
                        className={cn(
                            "min-w-[30px] min-h-[30px] flex items-center justify-center rounded-full transition-all duration-200 ease-in-out",
                            isNextDisabled ? "opacity-50" : "bg-primary-gray"
                        )}
                    >
                        <img className='ml-[2px] rotate-180' src={getImageUrl("arrow.svg")} alt='next arrow' />
                    </button>
                </div>
            </div>

            <ul
                ref={scrollRef}
                className='mt-[2rem] flex pb-[1.875rem] transition-transform duration-300 ease-in-out'
                style={{ transform: `translateX(${position}px)`, gap }}
            >
                {items.map((item) => (
                    <li key={item.id} style={{ minWidth }}>
                        <RelatedItem {...item} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Carousel;