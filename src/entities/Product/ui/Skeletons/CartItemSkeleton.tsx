const CartItemSkeleton = ({ index }: { index: number }) => {
    return (
        <li className={`opacity-${index ? 100 - index * 10 : 100} flex items-center gap-5`}>
            <span className='min-w-[80px] h-[80px] rounded-full bg-gray-100 space-y-5 relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
            <div className='flex items-center justify-between w-full'>
                <div className='flex flex-col gap-3'>
                    <span className='bg-gray-100 w-[180px] h-[30px] space-y-5 rounded-xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                    <span className='bg-gray-100 w-[250px] h-[30px] space-y-5 rounded-xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                </div>
                <div className='flex items-center gap-3'>
                    <span className='bg-gray-100 w-[100px] h-[40px] space-y-5 rounded-xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                    <span className='bg-gray-100 w-[120px] h-[40px] space-y-5 rounded-xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                </div>
            </div>
        </li>
    );
};

export default CartItemSkeleton;