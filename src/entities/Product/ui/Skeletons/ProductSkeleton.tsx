const ProductSkeleton = () => {
    return (
        <li className='max-md:w-full max-w-[300px] w-full'>
            <div className='bg-gray-50 space-y-5 rounded-2xl p-4 relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/30 before:to-transparent overflow-hidden isolate hover:shadow-xl hover:shadow-black/5 before:border-t before:border-primary-gray/30 transition-shadow duration-200 ease-linear'>
                <div className='h-[260px] rounded-full bg-gray-100'></div>
                <div className='space-y-3 flex flex-col items-center justify-center'>
                    <h2 className='h-[20px] w-1/2 rounded-lg bg-gray-100'></h2>
                </div>
                <div className='flex items-center justify-between'>
                    <h3 className='h-[30px] w-1/3 rounded-lg bg-gray-100'></h3>
                    <button className='h-[50px] w-1/2 rounded-lg bg-gray-100'></button>
                </div>
            </div>
        </li>
    );
};

export default ProductSkeleton;