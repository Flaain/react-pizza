import Stacked from "@/shared/ui/Stacked/ui/ui";
import { routerList } from "@/shared/config/constants";
import { declOfNum } from "@/shared/lib/helpers/declOfNum";
import { userSelector } from "@/shared/model/selectors";
import { useAppSelector } from "@/shared/model/store";
import { Link } from "react-router-dom";

const LKPage = () => {
    const { extraInfo } = useAppSelector(userSelector);

    return (
        <section className='grid grid-cols-2'>
            <Link
                to={routerList.LK.children.ORDERS}
                className='group flex flex-col gap-2 p-5 border border-primary-gray border-solid rounded-lg hover:shadow-lg transition-shadow ease-in-out duration-200'
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
        </section>
    );
};

export default LKPage;