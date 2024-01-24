const OptionsSelectorSkeleton = () => {
    return (
        <div className='sticky top-5 flex flex-col gap-2 justify-between p-5 min-w-[400px] min-h-[250px] rounded-xl bg-white shadow-xl border border-solid border-primary-gray'>
            <span className='w-[150px] h-[30px] bg-gray-100 rounded-full relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
            <div className='flex flex-col rounded-lg max-md:w-full gap-2'>
                <div className='w-full h-auto'>
                    <ul className='grid grid-cols-2 gap-2 p-1 overflow-hidden'>
                        <li className='w-full h-[40px]'>
                            <span className='flex h-full bg-gray-100 space-y-5 rounded-lg relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                        </li>
                        <li className='w-full h-[40px]'>
                            <span className='flex h-full bg-gray-100 space-y-5 rounded-lg relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                        </li>
                    </ul>
                </div>
                <div className='w-full h-auto'>
                    <ul className='grid grid-cols-3 gap-3 p-1 overflow-hidden'>
                        <li className='w-full h-[40px]'>
                            <span className='flex h-full bg-gray-100 space-y-5 rounded-lg relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                        </li>
                        <li className='w-full h-[40px]'>
                            <span className='flex h-full bg-gray-100 space-y-5 rounded-lg relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                        </li>
                        <li className='w-full h-[40px]'>
                            <span className='flex h-full bg-gray-100 space-y-5 rounded-lg relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                        </li>
                    </ul>
                </div>
            </div>
            <span className='w-full h-[40px] bg-gray-100 rounded-full relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
        </div>
    );
};

export default OptionsSelectorSkeleton;