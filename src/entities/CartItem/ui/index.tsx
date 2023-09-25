import React from "react";
import cn from "../../../shared/lib/classNames";
import getImageUrl from "../../../shared/lib/helpers/getImageUrl";
import getIntlPrice from "../../../shared/lib/helpers/getIntlPrice";
import { Props } from "../interfaces";
import { AppContext } from "../../../app/context";
import { initialTypes } from "../../../shared/initialValues";
import { Link } from "react-router-dom";

const CartItem: React.FC<Props> = ({ pizzaId, id, count, img, size, title, type, price, loading }) => {
    const { setCart } = React.useContext(AppContext);

    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [itemCount, setItemCount] = React.useState(count ?? 1);

    const intlSize = new Intl.NumberFormat(navigator.language, { style: "unit", unit: "centimeter", unitDisplay: "short" }).format(size);

    const handleUpDownCount = ({ target }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (target instanceof HTMLButtonElement) {
            const { dataset } = target;
            
            if (!Object.keys(dataset).length || (!dataset.minus && !dataset.plus)) return;
            
            setItemCount((prevState) => dataset.minus ? prevState <= 1 ? prevState : prevState - 1 : prevState + 1);
            
            setCart((prevState) => prevState.map((pizza) => {
                if (pizzaId === pizza.id) {
                    return {
                        ...pizza,
                        items: pizza.items.map((item) => {
                            if (item.id === id) {
                                return {
                                    ...item,
                                    count: dataset.minus ? item.count <= 1 ? item.count : item.count - 1 : item.count + 1
                                };
                            }
                            return item;
                        }),
                    };
                }
                return pizza;
            }));
        }
    };

    const handleRemoveItem = () => {
        setCart((prevState) => prevState.map((pizza) => {
            if (pizza.id === pizzaId) {
                return {
                    ...pizza,
                    items: pizza.items.filter((item) => item.id !== id),
                };
            }
            return pizza;
        }).filter((pizza) => pizza.items.length !== 0));
    };

    const handleChange = ({ target: { valueAsNumber } }: React.ChangeEvent<HTMLInputElement>) => {
        setItemCount(valueAsNumber <= 0 || !valueAsNumber ? 1 : valueAsNumber);
    }

    const handleBlur = ({ target: { valueAsNumber } }: React.FocusEvent<HTMLInputElement>) => {
        setCart((prevState) => prevState.map((pizza) => {
            if (pizzaId === pizza.id) {
                return {
                    ...pizza,
                    items: pizza.items.map((item) => {
                        if (item.id === id) {
                            return {
                                ...item,
                                count: valueAsNumber,
                            };
                        }
                        return item;
                    }),
                };
            }
            return pizza;
        }));
    };

    return (
        <div className='flex items-center justify-between group'>
            <div className='flex items-center gap-5'>
                <img
                    loading="lazy"
                    width={100}
                    height={100}
                    src={imageLoaded ? img : getImageUrl("thumbnail.svg")}
                    alt={title}
                    onLoad={() => setImageLoaded(true)}
                />
                <div className='flex flex-col'>
                    <Link to={`/pizza/${title}`} className='text-primary-black text-lg font-medium'>
                        {title}
                    </Link>
                    <span className='text-gray-400'>
                        {initialTypes[type]} тесто, {intlSize}
                    </span>
                </div>
            </div>
            <div className='flex justify-between items-start gap-5'>
                <div className='flex items-center gap-3' onClick={handleUpDownCount}>
                    <button
                        data-minus
                        className={cn(
                            "flex items-center justify-center w-[30px] h-[30px] font-bold box-border bg-primary-gray rounded",
                            itemCount === 1 ? "text-gray-400" : "text-primary-black"
                        )}
                        disabled={itemCount === 1 || loading}
                    >
                        -
                    </button>
                    <input
                        className='text-lg font-medium appearance-none outline-none w-[30px] h-[30px] text-center'
                        type='number'
                        value={itemCount}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <button
                        data-plus
                        disabled={loading}
                        className='flex items-center justify-center w-[30px] h-[30px] font-bold box-border bg-primary-gray rounded'
                    >
                        +
                    </button>
                </div>
                <div className='flex items-center gap-4'>
                    <span className='text-xl min-w-[100px] flex justify-end font-medium'>{getIntlPrice(itemCount * price)}</span>
                    <button
                        disabled={loading}
                        onClick={handleRemoveItem}
                        className='group-hover:opacity-100 group-hover:pointer-events-auto opacity-0 pointer-events-none transition-opacity durta ease-in-out'
                    >
                        <img src={getImageUrl("bucket.svg")} alt='удалить' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;