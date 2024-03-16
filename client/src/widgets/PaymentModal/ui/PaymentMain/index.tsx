import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import cn from "@/shared/lib/classNames";
import { PaymentMainProps, Tab } from "@/widgets/PaymentModal/model/interfaces";

const tabs: Array<Tab> = [
    { method: "cash", img: "cash.svg", title: "Наличными" },
    { method: "card", title: "Картой" },
];

const PaymentMain = ({ currentInfo, setCurrentInfo }: PaymentMainProps) => {
    return (
        <div className='flex flex-col gap-5 h-full'>
            <ul className='flex flex-col gap-5'>
                {tabs.map(({ title, method, img }) => {
                    const isSelected = currentInfo?.method === method;
                    return (
                        <li key={method}>
                            <label
                                title={title}
                                className={cn(
                                    "flex items-center gap-3 w-full p-5 truncate rounded-lg border border-solid cursor-pointer hover:border-primary-orange transition-colors duration-200 ease-in-out",
                                    isSelected ? "border-primary-orange" : "border-primary-gray"
                                )}
                            >
                                {img && <img src={getImageUrl(img)} alt={title} />}
                                {title}
                                <input
                                    type='radio'
                                    name='method'
                                    className='sr-only'
                                    checked={isSelected}
                                    onChange={() => setCurrentInfo({ method })}
                                />
                            </label>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default PaymentMain;