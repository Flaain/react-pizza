import { Image } from "../../Image";
import ImageSkeleton from "../../Image/ui/Skeleton";

const Stacked = ({
    items,
    MAX_ITEMS,
    STRICT_NUMBER,
}: {
    items: Array<{ id: string | number; src: string }>;
    MAX_ITEMS?: number;
    STRICT_NUMBER?: number;
}) => {
    return (
        <ul className='flex items-center -space-x-5'>
            {items.slice(0, MAX_ITEMS).map((item) => (
                <li
                    key={item.id}
                    className='w-16 h-16 relative rounded-full border-2 border-solid border-white shrink-0 overflow-hidden'
                >
                    <Image
                        className='w-full h-full object-cover'
                        src={item.src}
                        skeleton={<ImageSkeleton height={60} width={60} />}
                    />
                </li>
            ))}
            {((MAX_ITEMS && items.length > MAX_ITEMS) || STRICT_NUMBER) && (
                <li className='w-16 h-16 -ml-5 relative rounded-full border-2 border-solid border-primary-gray shrink-0 overflow-hidden'>
                    <span className='w-full h-full flex items-center justify-center bg-white font-medium'>
                        +{(MAX_ITEMS && (MAX_ITEMS < 100 ? items.length - MAX_ITEMS : 99)) || STRICT_NUMBER}
                    </span>
                </li>
            )}
        </ul>
    );
};

export default Stacked;
