import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import Title from "@/shared/ui/Title/ui";
import { DetailsHeaderProps } from "../../model/interfaces";

const DetailsHeader = ({ title, rating }: DetailsHeaderProps) => {
    return (
        <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-start gap-5'>
                <button
                    className='flex items-center justify-center p-2 min-w-[30px] min-h-[30px] rounded-full bg-primary-gray mt-1'
                    onClick={() => window.history.back()}
                    title='Вернуться назад'
                >
                    <img src={getImageUrl("arrow.svg")} alt='back arrow' className='mr-[2px]' />
                </button>
                <Title title={title} />
            </div>
            <div className='flex items-center gap-5'>
                <span className='flex items-center gap-2 font-semibold'>
                    <img src={getImageUrl("rating.svg")} alt='start rating' width={14} height={14} />
                    {rating}
                </span>
                <a
                    href='#'
                    className='text-gray-400 border-b border-dashed hover:text-primary-black hover:border-primary-black'
                >
                    391 оценка
                </a>
            </div>
        </div>
    );
};
export default DetailsHeader;