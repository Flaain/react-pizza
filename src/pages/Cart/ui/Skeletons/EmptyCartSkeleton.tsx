import Container from "@/shared/ui/Container";

const EmptyCartSkeleton = () => {
    return (
        <section>
            <Container classNames='max-w-[1320px] w-full my-0 mx-auto px-[15px] box-border flex flex-col items-center justify-center gap-10 h-[calc(100vh-132px)]'>
                <div className='flex flex-col gap-2 items-center justify-center'>
                    <span className='bg-gray-100 w-[250px] h-[40px] space-y-5 rounded-full relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                    <span className='bg-gray-100 w-[350px] h-[30px] space-y-5 rounded-full relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                    <span className='mt-5 mb-5 bg-gray-100 w-[250px] h-[250px] space-y-5 rounded-2xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                    <span className='bg-gray-100 w-[200px] h-[40px] space-y-5 rounded-full relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                </div>
            </Container>
        </section>
    );
};

export default EmptyCartSkeleton;