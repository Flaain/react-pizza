import Stacked from "@/shared/ui/Stacked/ui/ui";
import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";
import { routerList } from "@/shared/config/constants";
import { declOfNum } from "@/shared/lib/helpers/declOfNum";
import { userSelector } from "@/shared/model/selectors";
import { useAppSelector } from "@/shared/model/store";
import { Link } from "react-router-dom";
import LogoutBtn from "@/features/LogoutBtn/ui/ui";

const LKPage = () => {
    const { extraInfo, lang, name, email } = useAppSelector(userSelector);

    return (
        <section className='grid grid-cols-3 gap-5 max-lg:grid-cols-1 pt-5'>
            <div className='min-h-[120px] relative group flex flex-col justify-end items-end gap-2  p-5 border border-primary-gray border-solid rounded-lg hover:shadow-lg transition-shadow ease-in-out duration-200'>
                <Link to={routerList.LK.children.DETAILS} className='flex box-border flex-col inset-0 p-5 absolute'>
                    <div className='flex items-center gap-5'>
                        <span className='max-lg:w-10 max-lg:h-10 w-20 h-20 rounded-full flex items-center justify-center bg-primary-gray text-primary-black max-lg:text-xl text-4xl font-bold'>
                            {name![0]}
                        </span>
                        <h2 className='group-hover:text-primary-orange transition-colors ease-in-out duration-200 text-2xl font-semibold'>
                            {name}
                        </h2>
                    </div>
                    <div className='mt-auto flex items-center gap-2'>
                        <p className='mt-auto text-gray-300 truncate' title={email!}>
                            Почта: <span className='text-primary-black'>{email}</span>
                        </p>
                    </div>
                </Link>
                <LogoutBtn className='z-50' />
            </div>
            <Link
                to={routerList.LK.children.ORDERS}
                className='group overflow-hidden flex flex-col gap-2 p-5 border border-primary-gray border-solid rounded-lg hover:shadow-lg transition-shadow ease-in-out duration-200'
            >
                <h2 className='group-hover:text-primary-orange transition-colors ease-in-out duration-200 text-2xl mb-2 font-semibold'>
                    Заказы
                </h2>
                {extraInfo?.ordersGoods.length ? (
                    <>
                        <Stacked
                            items={extraInfo!.ordersGoods}
                            STRICT_NUMBER={extraInfo!.totalItemsCount - extraInfo!.ordersGoods.length}
                        />
                        <p className='opacity-50'>
                            {extraInfo!.ordersCount} {declOfNum(extraInfo!.ordersCount, ["заказ", "заказа", "заказов"])}
                        </p>
                    </>
                ) : (
                    <p className='opacity-50'>Нет заказов</p>
                )}
            </Link>
            <div className='group flex flex-col gap-2 p-5 border border-primary-gray border-solid rounded-lg hover:shadow-lg transition-shadow ease-in-out duration-200'>
                <h2 className='group-hover:text-primary-orange transition-colors ease-in-out duration-200 text-2xl font-semibold'>
                    Сводка
                </h2>
                <p className='text-primary-black opacity-50'>Процент выкупа, сумма выкупа и общая сумма заказов</p>
                {extraInfo?.ordersCount ? (
                    <ul className='flex items-center mt-auto'>
                        <li className='text-primary-black text-xl pr-2 font-semibold'>
                            {Number(extraInfo!.purchasePercent / 100).toLocaleString(lang, {
                                style: "percent",
                                maximumFractionDigits: 2,
                            })}
                        </li>
                        <li className='text-primary-black text-xl px-2 border-x border-solid border-primary-gray font-semibold'>
                            {getIntlPrice(extraInfo!.purchaseAmount)}
                        </li>
                        <li className='text-primary-black text-xl pl-2 font-semibold'>
                            {getIntlPrice(extraInfo!.totalOrdersPrice)}
                        </li>
                    </ul>
                ) : (
                    <p className='text-primary-black opacity-50'>Сделайте первый заказ, чтобы узнать сводку</p>
                )}
            </div>
        </section>
    );
};

export default LKPage;