import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";
import Image from "@/shared/ui/Image/ui/ui";
import ImageSkeleton from "@/shared/ui/Image/ui/Skeleton";
import Typography from "@/shared/ui/Typography/ui/ui";
import { Link } from "react-router-dom";
import { RelatedItemProps } from "../../model/interfaces";

const RelatedItem = ({ id, imageUrl, price, rating, title, itemWidth }: RelatedItemProps) => {
    return (
        <Link to={`/product/${id}`}>
            <article>
                <Image
                    loading='lazy'
                    alt={title}
                    src={imageUrl}
                    width={itemWidth}
                    height={200}
                    skeleton={<ImageSkeleton width={200} height={200} />}
                />
                <div className='flex flex-col gap-1'>
                    <Typography as='h4' size='xl' weight='bold'>
                        {getIntlPrice(price)}
                    </Typography>
                    <Typography as='h5' weight='medium'>
                        {title}
                    </Typography>
                    <div className='flex items-center gap-3'>
                        <Typography className='flex items-center gap-2 font-semibold'>
                            <img src={getImageUrl("rating.svg")} alt='start rating' width={14} height={14} />
                            {rating}
                        </Typography>
                        <Typography variant='description'>391 оценка</Typography>
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default RelatedItem;