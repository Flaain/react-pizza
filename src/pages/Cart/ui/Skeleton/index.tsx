import Container from "@/shared/ui/Container";
import React from "react";

const Skeleton = () => {
    return (
        <section>
            <Container classNames='grid grid-cols-7 max-w-[1320px] w-full my-0 mx-auto px-[15px] box-border py-5'>
                <div className='col-span-5'>
                    <div className='flex flex-col self-start mr-10 mb-10 pb-5 justify-between px-10 rounded-xl bg-white shadow-lg border border-solid border-primary-gray'>
                        <div className='flex items-center justify-between sticky top-0 bg-white z-10 py-5'>
                            <span className='bg-gray-100 w-1/3 h-[40px] space-y-5 rounded-xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                            <span className='bg-gray-100 w-[100px] h-[30px] space-y-5 rounded-xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                        </div>
                        <ul className='flex flex-col gap-5 overflow-hidden mt-5'>
                            {[...Array(3)].map((_, index) => (
                                <li
                                    key={index}
                                    className={`opacity-${index ? 100 - index * 10 : 100} flex items-center gap-5`}
                                >
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
                            ))}
                        </ul>
                    </div>
                    <div className='flex gap-5 flex-col col-span-full items-start self-start mr-10 mb-10 py-5 px-10 rounded-xl box-border bg-white shadow-lg border border-solid border-primary-gray'>
                        <span className='bg-gray-100 w-1/2 h-[30px] space-y-5 rounded-xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                        <p className='bg-gray-100 w-1/4 h-[30px] space-y-5 rounded-xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></p>
                    </div>
                    <div className='flex gap-5 flex-col col-span-full items-start self-start mr-10 mb-10 py-5 px-10 rounded-xl box-border bg-white shadow-lg border border-solid border-primary-gray'>
                        <span className='bg-gray-100 w-[200px] h-[30px] space-y-5 rounded-xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                        <p className='bg-gray-100 w-[300px] h-[30px] space-y-5 rounded-xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></p>
                    </div>
                </div>
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
            </Container>
        </section>
    );
};

export default Skeleton;