import ImageSkeleton from "@/shared/ui/Image/ui/Skeleton";

const RelatedItemSkeleton = () => {
    return (
        <div className='bg-gray-50 space-y-5 rounded-2xl p-4 relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/30 before:to-transparent overflow-hidden isolate hover:shadow-xl hover:shadow-black/5 before:border-t before:border-primary-gray/30 transition-shadow duration-200 ease-linear'>
            <ImageSkeleton width={200} height={200} />
            <div className='space-y-3 flex flex-col items-center justify-center'>
                <h2 className='h-[20px] w-1/2 rounded-lg bg-gray-100'></h2>
            </div>
        </div>
    );
};

export default RelatedItemSkeleton;
