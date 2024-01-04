import React from "react";
import useCarousel from "@/shared/hooks/useCarousel";
import cn from "@/shared/lib/classNames";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import RelatedItem from "./RelatedItem";
import { Product } from "@/shared/api/interfaces";
import { api } from "@/shared/api";
import { Props } from "../model/interfaces";

const RelatedItems = ({ activeItem, title }: Props) => {
    const [items, setItems] = React.useState<Array<Product>>([]);

    const scrollRef = React.useRef<HTMLUListElement | null>(null);
    const additionalPosition = 30;
    const {
        position,
        itemWidth,
        gap,
        isPrevDisabled,
        isNextDisabled,
        handleMouseEnter,
        handleMouseLeave,
        handleNext,
        handlePrev,
    } = useCarousel({ items, scrollRef });

    React.useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const { data } = await api.getProducts('/products?_select=-types,-sizes,-ingredients,-category,-description', controller);
                setItems((data as unknown as Array<Product>).filter(({ id }) => id !== activeItem.id));
            } catch (error) {
                console.error(error);
            }
        })()

        return () => {
            controller.abort();
        }
    }, [activeItem]);
    
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
                className='mt-[2rem] flex items-center justify-between pb-[1.875rem] transition-transform duration-300 ease-in-out'
                style={{ transform: `translateX(${position}px)`, gap }}
            >
                {items.map((item) => (
                    <li key={item.id} style={{ minWidth: itemWidth }}>
                        <RelatedItem {...item} itemWidth={itemWidth}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RelatedItems;