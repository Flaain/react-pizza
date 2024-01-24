import React from "react";

const Skeleton = () => {
    return (
        <div className='row-start-1 col-start-6 col-end-8 sticky top-5 flex flex-col self-start justify-between gap-5 col-span-2 p-5 rounded-xl bg-white shadow-xl border border-solid border-primary-gray'>
            {[...Array(3)].map((_, index) => (
                <React.Fragment key={index}>
                    <span className='bg-gray-100 w-[150px] h-[30px] space-y-5 rounded-xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                    <p className='bg-gray-100 w-[250px] h-[30px] space-y-5 rounded-xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></p>
                </React.Fragment>
            ))}
            <p className='w-full flex items-center justify-between gap-5 mt-5'>
                <span className='bg-gray-100 w-[200px] h-[30px] space-y-5 rounded-xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                <span className='bg-gray-100 w-[150px] h-[30px] space-y-5 rounded-xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
            </p>
            <span className='mt-auto bg-gray-100 w-full h-[50px] space-y-5 rounded-xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
        </div>
    );
};

export default Skeleton;