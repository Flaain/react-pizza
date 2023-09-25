import React from "react";
import cn from "../../../shared/lib/classNames";
import getImageUrl from "../../../shared/lib/helpers/getImageUrl";
import { PaymentModalContext } from "../../../app/context";
import { AvaiblePaymentMenus } from "../../../app/context/types";
import { PaymentInfo } from "../../../pages/Cart/interfaces";
import { HandleChangeArgs, Tabs } from "../interfaces";

const PaymentMain = () => {
    const { setActiveMenu, setCurrentInfo, currentInfo, handleSave } = React.useContext(PaymentModalContext);
    const tabs: Array<Tabs> = [
        { title: "Наличными", method: "cash", img: "cash.svg" },
        { menu: "add-card", title: "Привязать новую карту" },
        { menu: "choose-card", title: "Выбрать карту для оплаты" },
    ];

    const handleChange = ({ tabMenu, title, method }: HandleChangeArgs) => {
        !tabMenu ? setCurrentInfo({ title, method } as PaymentInfo) : setActiveMenu(tabMenu as AvaiblePaymentMenus);
    };

    return (
        <div className='flex flex-col gap-5 h-full'>
            <ul className='flex flex-col gap-5'>
                {tabs.map(({ menu, title, method, img }) => (
                    <li key={title} className='flex'>
                        <label
                            title={title}
                            className={cn(
                                "flex items-center gap-3 w-full p-5 truncate rounded-lg border border-solid cursor-pointer hover:border-primary-orange transition-colors duration-200 ease-in-out",
                                currentInfo?.method && currentInfo.method === method
                                    ? "border-primary-orange"
                                    : "border-primary-gray"
                            )}
                        >
                            {img && <img src={getImageUrl(img)} alt={title} />}
                            {title}
                            <input
                                type='radio'
                                name='method'
                                className='sr-only'
                                checked={currentInfo?.method ? currentInfo.method === method : false}
                                onChange={() => handleChange({ tabMenu: menu!, title, method })}
                            />
                        </label>
                    </li>
                ))}
            </ul>
            <button
                onClick={handleSave}
                disabled={!currentInfo}
                className={cn(
                    "flex items-center mt-auto justify-center self-start py-2 px-5 rounded-lg bg-primary-orange text-white",
                    !currentInfo && "opacity-50"
                )}
            >
                Сохранить
            </button>
        </div>
    );
};

export default PaymentMain;