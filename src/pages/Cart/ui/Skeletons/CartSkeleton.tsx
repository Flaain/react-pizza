import Container from "@/shared/ui/Container";
import { CartItemSkeleton } from "@/entities/Product";
import { CheckoutSkeleton } from "@/features/Checkout";
import { InfoBlockSkeleton } from "@/features/InfoBlock";

const CartSkeleton = () => {
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
                                <CartItemSkeleton key={index} index={index} />
                            ))}
                        </ul>
                    </div>
                    <InfoBlockSkeleton />
                    <InfoBlockSkeleton />
                </div>
                <CheckoutSkeleton />
            </Container>
        </section>
    );
};

export default CartSkeleton;