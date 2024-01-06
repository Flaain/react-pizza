const CollapseInfoSkeleton = () => {
    return (
        <div className='flex flex-col gap-5 pb-5 w-full mt-5'>
            <span className='w-[150px] h-[30px] bg-gray-100 space-y-5 rounded-xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
            <div className='flex items-start gap-8 w-full'>
                <span className='w-full h-[200px] bg-gray-100 space-y-5 rounded-xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                <span className='w-full h-[200px] bg-gray-100 space-y-5 rounded-xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
            </div>
        </div>
    );
};

export default CollapseInfoSkeleton;