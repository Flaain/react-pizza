import React from "react";
import cn from "../../../shared/lib/classNames";
import getImageUrl from "../../../shared/lib/helpers/getImageUrl";
import saveToLocalStorage from "../../../shared/lib/helpers/saveToLocalStorage";
import { Props } from "../interfaces";
import { DeliveryModalContext } from "../../../app/context";
import { DeliveryInfo } from "../../../pages/Cart/interfaces";

const TabContentItem: React.FC<Props> = ({
    activeTab,
    indexTab,
    address,
    currentInfo,
    setCurrentInfo,
    setDeliveryInfo,
    deliveryInfo,
    deliveryPrice,
    rating,
    handleChange,
}) => {
    const { setInitialDelivery } = React.useContext(DeliveryModalContext);

    const [showSubmenu, setShowSubmenu] = React.useState(false);

    const menuRef = React.useRef(null);
    const buttonSubmenuRef = React.useRef(null);

    React.useEffect(() => {
        const handleOutsideClick = ({ target }: MouseEvent) => {
            target !== menuRef.current && target !== buttonSubmenuRef.current && setShowSubmenu(false);
        };

        menuRef && window.addEventListener("click", handleOutsideClick);
        return () => window.removeEventListener("click", handleOutsideClick);
    }, [menuRef, buttonSubmenuRef]);

    const handleDelete = () => {
        if (confirm("Вы действительно хотите удалить адрес?")) {
            if (deliveryInfo?.address === address) {
                setDeliveryInfo(null);
                localStorage.removeItem(DELIVERY_INFO_KEY);
            }

            currentInfo?.address === address && setCurrentInfo(deliveryInfo);
            
            setInitialDelivery((prevState) =>
                prevState.map((item, index) => {
                    if (indexTab === index) {
                        const addresses = item.addresses.filter(({ address: _address }) => _address !== address);

                        saveToLocalStorage({ key: USER_ADDRESSES_KEY, data: JSON.stringify(addresses) });

                        return { ...item, addresses };
                    }
                    return item;
                })
            );
        } else return;
    };

    const handleDeliveryInfoAddressEqual = (address: string) => {
        setDeliveryInfo((prevState) => ({ ...prevState, address } as DeliveryInfo));
        saveToLocalStorage({ key: DELIVERY_INFO_KEY, data: JSON.stringify({ ...deliveryInfo, address }) });
    };

    const handleChangeAddress = () => {
        const newAddress = prompt("Введите новый адрес", address)?.trim().toLowerCase();

        if (!newAddress || newAddress === address.toLowerCase() || !newAddress.length) return;

        const variants = [
            { condition: deliveryInfo?.address === address, action: () => handleDeliveryInfoAddressEqual(newAddress) },
            {
                condition: currentInfo?.address === address,
                action: () => setCurrentInfo((prevState) => ({ ...prevState, address: newAddress } as DeliveryInfo)),
            },
        ];

        setInitialDelivery((prevState) =>
            prevState.map((item, index) => {
                if (index === indexTab) {
                    return {
                        ...item,
                        addresses: item.addresses.map((obj) => {
                            if (obj.address === address) {
                                saveToLocalStorage({
                                    key: USER_ADDRESSES_KEY,
                                    data: JSON.stringify([
                                        ...item.addresses.filter(({ address: _address }) => _address !== address),
                                        { ...obj, address: newAddress },
                                    ]),
                                });

                                return {
                                    ...obj,
                                    address: newAddress,
                                };
                            }
                            return obj;
                        }),
                    };
                }
                return item;
            })
        );

        variants.forEach(({ condition, action }) => condition && action());
    };

    return (
        <li className='flex relative'>
            <label
                title={address}
                className={cn(
                    "flex-1 p-5 truncate rounded-lg border border-solid cursor-pointer hover:border-primary-orange transition-colors duration-200 ease-in-out",
                    currentInfo?.address === address ? "border-primary-orange" : "border-primary-gray"
                )}
            >
                <div className='flex flex-col gap-2'>
                    <p className='truncate font-medium'>{address}</p>
                    {rating && (
                        <span className='flex items-center gap-2 font-medium text-primary-black'>
                            <img src={getImageUrl("rating.svg")} alt={`Рейтинг - ${rating}`} width={14} height={14} />
                            {rating}
                        </span>
                    )}
                </div>
                <input
                    type='radio'
                    name='address'
                    className='sr-only'
                    checked={currentInfo?.address === address}
                    onChange={() => handleChange(address, rating, deliveryPrice)}
                />
            </label>
            {activeTab.isEditable && (
                <div className='absolute right-2 translate-y-[-50%] top-[50%] z-40'>
                    <button
                        ref={buttonSubmenuRef}
                        onClick={() => setShowSubmenu((prevState) => !prevState)}
                        className='w-[30px] h-[30px] flex items-center justify-center transition-colors duration-200 ease-in-out rounded-full hover:bg-primary-gray'
                    >
                        <img className='pointer-events-none' src={getImageUrl("dots.svg")} alt='menu' />
                    </button>
                    {showSubmenu && (
                        <ul
                            ref={menuRef}
                            className='flex flex-col gap-1 absolute right-5 p-[12px] rounded-lg shadow-md border border-solid border-primary-gray bg-white'
                        >
                            <li className='px-2 py-1 hover:bg-primary-gray rounded-md cursor-pointer flex items-center justify-start'>
                                <button onClick={handleDelete}>удалить</button>
                            </li>
                            <li className='px-2 py-1 hover:bg-primary-gray rounded-md cursor-pointer flex items-center justify-start'>
                                <button onClick={handleChangeAddress}>изменить</button>
                            </li>
                        </ul>
                    )}
                </div>
            )}
        </li>
    );
};

export default TabContentItem;