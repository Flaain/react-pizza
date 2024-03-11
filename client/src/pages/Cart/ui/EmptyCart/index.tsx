import Container from "@/shared/ui/Container";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import { Link } from "react-router-dom";
import { Image } from "@/shared/ui/Image";

const EmptyCart = () => {
    return (
        <Container classNames='max-w-[1320px] w-full my-0 mx-auto px-[15px] box-border flex flex-col items-center justify-center gap-10 h-[calc(100vh-132px)]'>
            <div className='flex flex-col justify-center items-center gap-3'>
                <h1 className='font-bold text-3xl'>Корзина пуста 😕</h1>
                <p className='text-center text-gray-500'>Перейдите на «Главную» и выберите понравившийся товар.</p>
            </div>
            <Image
                src={getImageUrl("shopping-cart-colour.svg")}
                alt='empty cart'
                skeleton={
                    <span className='bg-gray-100 w-[250px] h-[250px] space-y-5 rounded-2xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
                }
            />
            <Link
                to='/'
                className='bg-primary-black text-white py-2 px-6 rounded-full flex items-center justify-center'
            >
                Вернуться назад
            </Link>
        </Container>
    );
};

export default EmptyCart;
