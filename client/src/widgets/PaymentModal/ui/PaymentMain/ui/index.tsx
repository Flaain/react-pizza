import cn from "@/shared/lib/classNames";
import PaymentMainItem from "./PaymentMainItem";
import { Menu, PaymentInfo, PaymentMainProps, PaymentMethod } from "@/widgets/PaymentModal/model/interfaces";
import { useAppSelector } from "@/shared/model/store";
import { userSelector } from "@/shared/model/selectors";
import { tabs } from "@/widgets/PaymentModal/model/tabs";

const PaymentMain = ({ currentInfo, handleSave, setActiveMenu, setCurrentInfo, closeHandler }: PaymentMainProps) => {
    const { paymentInfo } = useAppSelector(userSelector);

    const handleChange = (menu: Menu | undefined, method: PaymentMethod | undefined) => {
        menu ? setActiveMenu(menu) : setCurrentInfo({ method } as PaymentInfo);
    };

    return (
        <div className='flex flex-col gap-5 h-full'>
            <ul className='flex flex-col gap-5'>
                {tabs.map((tab) => (
                    <PaymentMainItem key={tab.title} {...tab} currentInfo={currentInfo} handleChange={handleChange} />
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