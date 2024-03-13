import InfoList from "./InfoList";
import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";

import { InfoBlock } from "@/features/InfoBlock";
import { useAppSelector } from "@/shared/model/store";
import { cartSelector, userSelector } from "@/shared/model/selectors";
import { useNavigate } from "react-router-dom";
import { routerList } from "@/shared/config/constants";
import { Props } from "../model/interfaces";
import { DeliveryInfo } from "@/pages/DeliveryMethod/model/interfaces";

const InfoContainer = ({ setPaymentModalOpened }: Props) => {
    const { deliveryInfo, paymentInfo, isAuthenticated } = useAppSelector(userSelector);
    const { priceView: { totalPrice } } = useAppSelector(cartSelector);
    const { name, email } = useAppSelector(userSelector);

    const navigate = useNavigate();

    return (
        <div className='grid grid-cols-2'>
            <InfoBlock
                item={<InfoList items={[
                    { 
                        title: { value: deliveryInfo?.method === "delivery" ? "Доставка курьером" : "Пункт выдачи" },
                        description: { 
                            value: (deliveryInfo as DeliveryInfo)?.address.line,  
                            className: (deliveryInfo as DeliveryInfo)?.address.line.length > 300 ? "truncate" : "break-words" 
                        },
                    },
                    {
                        title: { value: "Стоимость доставки" },
                        description: { value: deliveryInfo?.deliveryPrice ? getIntlPrice(deliveryInfo?.deliveryPrice) : "Бесплатно" }
                    }
                ]} />}
                callToActionReason={!!deliveryInfo}
                callToActionText='заполните форму доставки'
                title='Способ доставки'
                updater={() => navigate(routerList.CART.children.DELIVERY_METHOD)}
            />
            <InfoBlock
                item={<InfoList items={[
                    { 
                        title: { value: paymentInfo?.method === "card" ? "Оплата картой" : "Наличными при получении" },
                        ...(paymentInfo?.method === "card" && { description: { value: "мы используем платежную систему Stripe" } }) 
                    },
                    { title: { value: "К оплате" }, description: { value: getIntlPrice(totalPrice + (deliveryInfo?.deliveryPrice ?? 0)) } },
                ]} />}
                callToActionReason={!!paymentInfo}
                callToActionText='заполните форму оплаты'
                title='Способ оплаты'
                updater={() => setPaymentModalOpened(true)}
            />
            <InfoBlock
                item={<InfoList items={[
                    { title: { value: "Имя" }, description: { value: name! } }, 
                    { title: { value: "Почта" }, description: { value: email! } } 
                ]} />}
                callToActionReason={isAuthenticated}
                callToActionText='Пожалуйста, войдите или зарегистрируйтесь'
                title='Мой профиль'
            />
        </div>
    );    
};

export default InfoContainer;