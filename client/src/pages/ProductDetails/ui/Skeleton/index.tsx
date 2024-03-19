import CollapseInfoSkeleton from "@/features/CollapseInfo/ui/Skeleton";
import cn from "@/shared/lib/classNames";
import Container from "@/shared/ui/Container";
import ImageSkeleton from "@/shared/ui/Image/ui/Skeleton";
import OptionsSelectorSkeleton from "@/shared/ui/OptionsSelector/ui/Skeleton";

const ProductDetailsSkeleton = () => {
    return (
        <section className='mt-5'>
            <Container
                classNames={cn("max-w-[1320px] w-full my-0 mx-auto px-[15px] box-border flex flex-col gap-5 relative")}
            >
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center justify-start gap-5'>
                        <span className='w-1/3 h-[40px] bg-gray-100 space-y-5 rounded-full relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                    </div>
                    <span className='w-[200px] h-[30px] bg-gray-100 space-y-5 rounded-full relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                    <div className='flex items-start justify-between'>
                        <ImageSkeleton width={450} height={450} />
                        <OptionsSelectorSkeleton />
                    </div>
                    <CollapseInfoSkeleton />
                </div>
            </Container>
        </section>
    );
};

export default ProductDetailsSkeleton;