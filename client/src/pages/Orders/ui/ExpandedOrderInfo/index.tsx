import ImageSkeleton from "@/shared/ui/Image/ui/Skeleton";
import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";
import { initialSizes, initialTypes } from "@/shared/config/constants";
import { declOfNum } from "@/shared/lib/helpers/declOfNum";
import { Order } from "@/shared/model/interfaces";
import { Image } from "@/shared/ui/Image";
import { motion } from "framer-motion";

const ExpandedOrderInfo = ({ order }: { order: Order }) => {
    return (
        <motion.div
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{ open: { opacity: 1, height: "auto" }, collapsed: { opacity: 0, height: 0 } }}
            transition={{ duration: 0.2, ease: "linear" }}
        >
            <ul className='py-4 mt-4 border-y border-solid border-y-primary-gray flex flex-col gap-4 max-h-[240px] overflow-auto'>
                {order.cart.items.map((item) => (
                    <li key={item._id} className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <Image
                                width={60}
                                height={60}
                                src={item.imageUrl}
                                skeleton={<ImageSkeleton height={60} width={60} />}
                            />
                            <div>
                                <h2 className='font-semibold'>{item.title}</h2>
                                <p className='opacity-50'>
                                    {initialTypes[item.type]} тесто, {initialSizes[item.size]} см
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 basis-40'>
                            <span className='text-primary-black opacity-50 self-end mr-auto'>
                                {item.count} {declOfNum(item.count, ["товар", "товара", "товаров"])}
                            </span>
                            <span className='text-primary-black font-semibold' title={`${getIntlPrice(item.price)} за единицу`}>{getIntlPrice(item.price)}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};

export default ExpandedOrderInfo;