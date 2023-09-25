import React from "react";
import Container from "../../../../shared/ui/Container";
import OrderList from "../../../../widgets/OrderList/ui";
import { Link } from "react-router-dom";
import { Order } from "../../../../shared/api/interfaces";

const Ordered: React.FC<Omit<Order, 'deliveryInfo'>> = ({ order, totalPrice }) => {
    return (
        <section className='pb-5'>
            <Container classNames='max-w-[900px] gap-10 my-0 mx-auto box-border flex flex-col items-start px-10 py-5 rounded-xl bg-white shadow-xl border border-solid border-primary-gray'>
                <div className='flex items-start flex-col gap-5'>
                    <h1 className='text-primary-black text-4xl font-bold'>Ваш заказ оплачен</h1>
                    <p className='text-gray-400 font-medium'>Спасибо что выбрали React Pizza</p>
                    <Link
                        to='/'
                        className='bg-primary-black w-full text-white py-2 px-6 rounded-full flex items-center justify-center'
                    >
                        Перейти на главную
                    </Link>
                    <p className='text-primary-black font-medium'>
                        Сумма заказа: <strong>{totalPrice}</strong>
                    </p>
                    <OrderList order={order} />
                </div>
            </Container>
        </section>
    );
};

export default Ordered;