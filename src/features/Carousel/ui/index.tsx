import React from "react";
import RelatedItem from "../../RelatedItem/ui";
import cn from "../../../shared/lib/classNames";
import getImageUrl from "../../../shared/lib/helpers/getImageUrl";
import { Props } from "./interfaces";

const Carousel: React.FC<Props> = ({ items, title, slidesToShow = 5, slidesToScroll = 1, gap = 30 }) => {
    const [position, setPosition] = React.useState(0);

    const scrollRef = React.useRef<HTMLUListElement>(null);
    const minWidth = scrollRef.current?.getBoundingClientRect().width! / slidesToShow - gap || 238;

    React.useEffect(() => setPosition(0), [items]);

    const handlePrev = () => {
        const itemsLeft = Math.abs(position) / (minWidth + gap);
        setPosition((prevState) => prevState + (itemsLeft >= slidesToScroll ? slidesToScroll * minWidth + gap : itemsLeft * (minWidth + gap)));
    };

    const handleNext = () => {
        const itemsLeft = Math.floor(items.length - (Math.abs(position) + slidesToShow * minWidth + gap) / minWidth + gap);
        setPosition((prevState) => prevState - (itemsLeft >= slidesToScroll ? slidesToScroll * minWidth + gap : itemsLeft * (minWidth + gap)));
    };

    const isBackDisabled = position === 0;
    const isNextDisabled = Math.abs(position) >= (items.length - slidesToShow) * minWidth + gap;

    return (
        <div className='w-full overflow-hidden'>
            <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-primary-black'>{title}</h2>

                <div className='hidden items-center justify-between gap-[10px] md:flex'>
                    <button
                        disabled={isBackDisabled}
                        onClick={handlePrev}
                        onMouseEnter={() => !isBackDisabled && scrollRef.current && (scrollRef.current.style.transform = `translateX(${position + 30}px)`)}
                        onMouseLeave={() => !isBackDisabled && scrollRef.current && (scrollRef.current.style.transform = `translateX(${position}px)`)}
                        className={cn(
                            "min-w-[30px] min-h-[30px] flex items-center justify-center rounded-full transition-colors duration-200 ease-in-out",
                            !isBackDisabled && "bg-primary-gray"
                        )}
                    >
                        <img className={cn('mr-[2px] transition-opacity duration-200 ease-in-out', isBackDisabled && 'opacity-50')} src={getImageUrl("arrow.svg")} alt='prev arrow' />
                    </button>
                    <button
                        disabled={isNextDisabled}
                        onMouseEnter={() => !isNextDisabled && scrollRef.current && (scrollRef.current.style.transform = `translateX(${position - 30}px)`)}
                        onMouseLeave={() => !isNextDisabled && scrollRef.current && (scrollRef.current.style.transform = `translateX(${position}px)`)}
                        onClick={handleNext}
                        className={cn(
                            "min-w-[30px] min-h-[30px] flex items-center justify-center rounded-full transition-colors duration-200 ease-in-out",
                            !isNextDisabled && "bg-primary-gray"
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