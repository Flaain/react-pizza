import React from "react";
import Container from "../../../shared/ui/Container";
import CartItemsList from "../../../widgets/CartItemsList";
import EmptyCart from "./EmptyCart";
import cn from "../../../shared/lib/classNames";
import Ordered from "./Ordered";
import MinimizeCartInfo from "../../../features/MinimizeCartInfo/ui";
import OrderInfo from "../../../features/OrderInfo/ui";
import DeliveryModal from "../../../features/DeliveryModal/ui";
import parseJSON from "../../../shared/lib/helpers/parseJSON";
import Spinner from "../../../shared/ui/Spinner/ui";
import PaymentInfoModal from "../../../entities/PaymentInfoModal/ui";
import MinimizeCartItemsButton from "../../../features/MinimizeCartItemsButton/ui";
import InfoCartContainer from "../../../widgets/InfoCartContainer/ui";
import { AppContext, CartContext } from "../../../app/context";
import { useCart } from "../../../shared/hooks/useCart";
import { api } from "../../../shared/api";
import { Order, Pizza } from "../../../shared/api/interfaces";
import { DeliveryInfo, PaymentInfo, Promocode } from "../interfaces";
import { DELIVERY_INFO_KEY, PAYMENT_INFO_KEY } from "../../../shared/initialValues";
import { AnimatePresence } from "framer-motion";

const Cart = () => {
    const { pizzas, cart, setCart } = React.useContext(AppContext);
    const { totalItems, price: { total } } = useCart();

    const [promocodes, setPromocodes] = React.useState<Array<Promocode>>([]);
    const [minimizeCartItems, setMinimizeCartItems] = React.useState(false);
    const [cartLoading, setCartLoading] = React.useState(true);
    const [orderLoading, setOrderLoading] = React.useState(false);
    const [ordered, setOrdered] = React.useState(false);
    const [orderData, setOrderData] = React.useState<Order | null>(null);
    const [deliveryModalOpened, setDeliveryModalOpened] = React.useState(false);
    const [paymentInfoModalOpened, setPaymentInfoModalOpened] = React.useState(false);
    const [deliveryInfo, setDeliveryInfo] = React.useState<DeliveryInfo | null>(parseJSON(DELIVERY_INFO_KEY) ?? null);
    const [paymentInfo, setPaymentInfo] = React.useState<PaymentInfo | null>(parseJSON(PAYMENT_INFO_KEY) ?? null);

    const isMinimizable = React.useMemo(() => cart.reduce((acc, { items }) => (acc += items.length), 0) > 1, [cart]);

    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await api.getPromocodes();
                setPromocodes(data);
            } catch (error) {
                console.log(error);
            } finally {
                setCartLoading(false);
            }
        })();
    }, []);

    if (cartLoading) return <Spinner />;

    if (!cart.length && !ordered && !cartLoading) return <EmptyCart />;

    const handleOrder = async () => {
        try {
            setOrderLoading(true);

            const order = cart.map((cartItem) => ({...cartItem, ...(pizzas.find((pizzaItem) => pizzaItem.id === cartItem.id) as Pizza)}));

            const { data } = await api.postOrder("/orders", { deliveryInfo, order, totalPrice: total } as Order);

            setOrderData(data);
        } catch (error) {
            console.error(error);
        } finally {
            setOrderLoading(false);
            setOrdered(true);
            setCart([]);
        }
    };

    return ordered && orderData ? (
        <Ordered order={orderData.order} totalPrice={orderData.totalPrice} />
    ) : (
        <CartContext.Provider
            value={{
                deliveryInfo,
                setDeliveryInfo,
                orderLoading,
                promocodes,
                paymentInfo,
                minimizeCartItems,
                setMinimizeCartItems,
                setDeliveryModalOpened,
                setPaymentInfoModalOpened,
                setPaymentInfo,
            }}
        >
            <section>
                <Container classNames='grid grid-cols-7 max-w-[1320px] w-full my-0 mx-auto px-[15px] box-border py-5'>
                    <AnimatePresence>
                        {deliveryModalOpened && <DeliveryModal key='deliveryModal' title='Способ доставки' />}
                        {paymentInfoModalOpened && (
                            <PaymentInfoModal
                                key='paymentModal'
                                closeHandler={() => setPaymentInfoModalOpened(false)}
                            />
                        )}
                    </AnimatePresence>
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
                                        onClick={() => setCart([])}
                                        className='text-primary-black border-b border-dashed hover:text-primary-orange hover:border-primary-orange'
                                    >
                                        Очистить корзину
                                    </button>
                                    {isMinimizable && <MinimizeCartItemsButton />}
                                </div>
                            </div>
                            {minimizeCartItems ? <MinimizeCartInfo /> : <CartItemsList cart={cart} />}
                        </div>
                        <InfoCartContainer />
                    </div>
                    <OrderInfo handleOrder={handleOrder} />
                </Container>
            </section>
        </CartContext.Provider>
    );
};

export default Cart;