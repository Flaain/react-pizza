const TabsSkeleton = () => {
    return (
        <div className='flex flex-col overflow-auto box-border'>
            <div className='grid grid-cols-2 w-full border border-solid rounded-xl border-primary-gray gap-5 p-1'>
                <span className='bg-gray-100 h-[50px] space-y-5 rounded-xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                <span className='bg-gray-100 h-[50px] space-y-5 rounded-xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
            </div>
            <ul className='flex flex-col gap-5 mt-5 overflow-auto h-full'>
                {[...Array(5)].map((_, index) => (
                    <li
                        key={index}
                        className={`opacity-${
                            index ? 100 - index * 10 : 100
                        } bg-gray-100 w-full h-[80px] space-y-5 rounded-xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30`}
                    ></li>
                ))}
            </ul>
        </div>
    );
};

export default TabsSkeleton;