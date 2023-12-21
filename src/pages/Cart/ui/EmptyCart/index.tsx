import Container from "@/shared/ui/Container";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import { Link } from "react-router-dom";

const EmptyCart = () => {
    return (
        <Container classNames='max-w-[1320px] w-full my-0 mx-auto px-[15px] box-border flex flex-col items-center justify-center gap-10 h-[calc(100vh-132px)]'>
            <div className='flex flex-col justify-center items-center gap-3'>
                <h1 className='font-bold text-3xl'>Корзина пустая 😕</h1>
                <p className='text-center text-gray-500'>
                    Вероятней всего, вы не заказывали ещё пиццу. <br /> Для того, чтобы заказать пиццу, перейди на
                    главную страницу.
                </p>
            </div>
            <img src={getImageUrl("shopping-cart-colour.svg")} alt='cart is empty' />
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