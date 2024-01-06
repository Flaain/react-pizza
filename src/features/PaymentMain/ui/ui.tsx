import cn from "@/shared/lib/classNames";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import { Menu, PaymentMethod } from "@/widgets/PaymentModal/model/interfaces";
import { Props, Tab } from "../model/interfaces";
import { useAppSelector } from "@/shared/model/store";
import { userSelector } from "@/shared/model/selectors";

const PaymentMain = ({ currentInfo, handleSave, setActiveMenu, setCurrentInfo, closeHandler }: Props) => {
    const { paymentInfo } = useAppSelector(userSelector);

    const tabs: Array<Tab> = [
        { title: "Наличными", method: "cash", img: "cash.svg" },
        { menu: "add-card", title: "Привязать новую карту" },
        { menu: "choose-card", title: "Выбрать карту для оплаты" },
    ];

    const handleChange = (menu: Menu | undefined, method: PaymentMethod | undefined) => {
        menu ? setActiveMenu(menu) : setCurrentInfo({ method });
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
                                checked={currentInfo?.method === method}
                                onChange={() => handleChange(menu, method)}
                            />
                        </label>
                    </li>
                ))}
            </ul>
            <div className='flex items-center gap-5 mt-auto'>
                <button
                    onClick={handleSave}
                    disabled={!currentInfo || paymentInfo?.method === currentInfo?.method}
                    className={cn(
                        "flex items-center justify-center py-2 px-5 rounded-lg bg-primary-orange text-white",
                        (!currentInfo || paymentInfo?.method === currentInfo?.method) && "opacity-50"
                    )}
                >
                    Сохранить
                </button>
                <button
                    onClick={closeHandler}
                    className='bg-primary-orange/10 py-2 px-5 rounded-lg text-primary-orange hover:bg-primary-orange/20 transition-colors duration-200 ease-in-out'
                >
                    Отмена
                </button>
            </div>
        </div>
    );
};

export default PaymentMain;