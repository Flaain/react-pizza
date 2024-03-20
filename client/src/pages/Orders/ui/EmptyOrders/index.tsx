import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import Container from "@/shared/ui/Container";
import Typography from "@/shared/ui/Typography/ui/ui";
import { Image } from "@/shared/ui/Image";
import { Link } from "react-router-dom";

const EmptyOrders = () => {
    return (
        <Container classNames='max-w-[1320px] w-full my-0 mx-auto px-[15px] box-border flex flex-col items-center justify-center gap-10 h-[calc(100vh-132px)]'>
            <div className='flex flex-col justify-center items-center gap-3'>
                <Typography as='h1' size='3xl' weight='bold'>
                    Нет заказов 😕
                </Typography>
                <Typography as='p' variant='description'>
                    Вероятней всего, вы не заказывали ещё пиццу. <br /> Для того, чтобы заказать пиццу, перейдите на
                    главную страницу.
                </Typography>
            </div>
            <Image src={getImageUrl("shopping-cart-colour.svg")} alt='empty cart' />
            <Link
                to='/'
                className='bg-primary-black text-white py-2 px-6 rounded-full flex items-center justify-center'
            >
                Вернуться назад
            </Link>
        </Container>
    );
};

export default EmptyOrders;