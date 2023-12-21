import React from "react";
import Container from "@/shared/ui/Container";
import EmptyCart from "./EmptyCart";
import cn from "@/shared/lib/classNames";
import MinimizeCartItemsButton from "@/features/MinimizeCartItemsButton/ui/ui";
import MinimazeCartInfo from "@/features/MinimizeCartInfo/ui/ui";
import CartItemsList from "./CartItemsList";
import Checkout from "@/features/Checkout/ui/ui";
import InfoContainer from "@/shared/ui/InfoContainer";

import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { cartSelector, userSelector } from "@/shared/model/selectors";
import { useAppSelector } from "@/shared/model/store";
import { clearCart } from "../model/slice";
import { useDispatch } from "react-redux";

const Cart = () => {
    const { cart, ordered, orderLoading, priceView: { totalItems } } = useAppSelector(cartSelector);
    const { jwt, deliveryInfo, paymentInfo } = useAppSelector(userSelector);

    const [minimizeCartItems, setMinimizeCartItems] = React.useState(false);
    const [paymentInfoModalOpened, setPaymentInfoModalOpened] = React.useState(false);

    const cartArr = React.useMemo(() => [...cart.values()], [cart]);
    const isMinimizable = React.useMemo(() => cartArr.reduce((acc, { items }) => (acc += items.length), 0) > 1, [cartArr]);
    const isCartEmpty = !cart.size && !ordered;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOrder = () => {
        console.log('test')
    }

    if (isCartEmpty) {
        return (
            <>
                <Navigate to='/cart' replace />
                <EmptyCart />
            </>
        );
    }

    return (
        <section>
            <Container classNames='grid grid-cols-7 max-w-[1320px] w-full my-0 mx-auto px-[15px] box-border py-5'>
                <Outlet />
                {/* <AnimatePresence>
                    {paymentInfoModalOpened && (<PaymentInfoModal key='paymentModal' closeHandler={() => setPaymentInfoModalOpened(false)} />)}
                </AnimatePresence> */}
                <div className='col-span-5'>
                    <div
                        className={cn(
                            "flex flex-col self-start mr-10 mb-10 pb-5 justify-between px-10 rounded-xl bg-white shadow-lg border border-solid border-primary-gray",
                            minimizeCartItems && "max-h-[120px]"
                        )}
                    >
                        <div className='flex items-center justify-between sticky top-0 bg-white z-10 py-5'>
                            <h1 className='text-2xl font-bold text-primary-black'>
                                Корзина <sup className='text-lg'>{totalItems}</sup>
                            </h1>
                            <div className='flex items-center gap-5'>
                                <button
                                    disabled={orderLoading}
                                    onClick={() => dispatch(clearCart())}
                                    className='text-primary-black border-b border-dashed hover:text-primary-orange hover:border-primary-orange'
                                >
                                    Очистить корзину
                                </button>
                                {isMinimizable && (
                                    <MinimizeCartItemsButton
                                        title={minimizeCartItems ? "показать товары" : "скрыть товары"}
                                        disabled={orderLoading}
                                        minimizeCartItems={minimizeCartItems}
                                        onClick={() => setMinimizeCartItems((prevState) => !prevState)}
                                    />
                                )}
                            </div>
                        </div>
                        {minimizeCartItems ? <MinimazeCartInfo /> : <CartItemsList cart={cartArr} />}
                    </div>
                    <InfoContainer disabled={orderLoading}/>
                </div>
                <Checkout
                    handleOrder={handleOrder}
                    setPaymentInfoModalOpened={setPaymentInfoModalOpened}
                />
            </Container>
        </section>
    );
};

export default Cart;