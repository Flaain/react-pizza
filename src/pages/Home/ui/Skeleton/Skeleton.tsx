import Container from "@/shared/ui/Container";

const Skeleton = () => {
    return (
        <section>
            <Container>
                <div className='flex flex-col gap-20'>
                    <div className='flex items-center justify-between gap-5'>
                        <ul className='flex w-full h-auto items-center justify-between gap-5'>
                            {[...Array(5)].map((_, index) => (
                                <li key={index} className='flex w-full'>
                                    <span className='bg-gray-100 w-full h-10 space-y-5 rounded-2xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                                </li>
                            ))}
                        </ul>
                        <div className='bg-gray-100 w-[100px] h-10 space-y-5 rounded-2xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></div>
                    </div>
                    <h1 className='bg-gray-100 w-[300px] h-10 space-y-5 rounded-2xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></h1>
                </div>
                <ul className='py-[30px] flex flex-wrap justify-between items-center gap-10'>
                    {[...Array(6)].map((_, index) => (
                        <li key={index} className='max-w-[350px] w-full'>
                            <div className='bg-gray-50 space-y-5 rounded-2xl p-4 relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/30 before:to-transparent overflow-hidden isolate hover:shadow-xl hover:shadow-black/5 before:border-t before:border-primary-gray/30 transition-shadow duration-200 ease-linear'>
                                <div className='h-[300px] rounded-full bg-gray-100'></div>
                                <div className='space-y-3 flex flex-col items-center justify-center'>
                                    <h2 className='h-[20px] w-1/2 rounded-lg bg-gray-100'></h2>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <h3 className='h-[30px] w-1/3 rounded-lg bg-gray-100'></h3>
                                    <button className='h-[50px] w-1/2 rounded-lg bg-gray-100'></button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
};
export default Skeleton;