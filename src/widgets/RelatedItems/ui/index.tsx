import React from "react";
import useCarousel from "@/shared/hooks/useCarousel";
import cn from "@/shared/lib/classNames";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import RelatedItem from "@/features/RelatedItem/ui";
import { Props } from "../interfaces";

const RelatedItems: React.FC<Props> = ({ items, title }) => {
    const scrollRef = React.useRef<HTMLUListElement | null>(null);
    const additionalPosition = 30;
    const {
        position,
        itemWidth,
        isPrevDisabled,
        isNextDisabled,
        handleMouseEnter,
        handleMouseLeave,
        handleNext,
        handlePrev,
    } = useCarousel({ items, scrollRef });

    return (
        <div className='w-full overflow-hidden'>
            <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-primary-black'>{title}</h2>
                <div className='hidden items-center justify-between gap-[10px] md:flex'>
                    <button
                        disabled={isPrevDisabled}
                        onClick={handlePrev}
                        onMouseEnter={() => handleMouseEnter("prev", additionalPosition, !isPrevDisabled)}
                        onMouseLeave={handleMouseLeave}
                        className={cn(
                            "min-w-[30px] min-h-[30px] flex items-center justify-center rounded-full transition-opacity duration-200 ease-in-out",
                            isPrevDisabled ? "opacity-50" : "bg-primary-gray"
                        )}
                    >
                        <img
                            className={cn(
                                "mr-[2px] transition-opacity duration-200 ease-in-out",
                                isPrevDisabled && "opacity-50"
                            )}
                            src={getImageUrl("arrow.svg")}
                            alt='prev arrow'
                        />
                    </button>
                    <button
                        disabled={isNextDisabled}
                        onMouseEnter={() => handleMouseEnter("next", additionalPosition, !isNextDisabled)}
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
                style={{ transform: `translateX(${position}px)`, gap: 30 }}
            >
                {items.map((item) => (
                    <li key={item.id} style={{ minWidth: itemWidth }}>
                        <RelatedItem {...item} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RelatedItems;