import Container from "@/shared/ui/Container";
import { Skeleton as ProductSkeleton } from "@/entities/Product";

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
                        <ProductSkeleton key={index} />
                    ))}
                </ul>
            </Container>
        </section>
    );
};
export default Skeleton;