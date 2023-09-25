import React from "react";
import cn from "../../../shared/lib/classNames";
import { PaymentModalContext } from "../../../app/context";
import { CreditCard } from "../../../pages/Cart/interfaces";

const PaymentUserCards = () => {
    const { setCurrentInfo, currentInfo, userCards, handleSave, paymentInfo } = React.useContext(PaymentModalContext);

    const handleChange = ({ address, cvv, expiry }: CreditCard) => {
        setCurrentInfo({ method: "card", title: "картой", card: { address, cvv, expiry } });
    };

    return (
        <>
            {!userCards.length ? (
                <p className='text-gray-400'>У вас нет доступных карт, привяжите хотя бы одну карту</p>
            ) : (
                <div className="flex flex-col h-full">
                    <ul className='flex flex-col gap-5'>
                        {userCards.map(({ address, cvv, expiry }) => {
                            const currentCard = { address, cvv, expiry };

                            return (
                                <li key={address} className='flex'>
                                    <label
                                        title={String(address)}
                                        className={cn(
                                            "flex-1 p-5 truncate rounded-lg border border-solid cursor-pointer hover:border-primary-orange transition-colors duration-200 ease-in-out",
                                            currentInfo?.card && currentInfo.card.address === address
                                                ? "border-primary-orange"
                                                : "border-primary-gray"
                                        )}
                                    >
                                        {address}
                                        <input
                                            type='radio'
                                            name='card'
                                            className='sr-only'
                                            checked={currentInfo?.card?.address === address}
                                            onChange={() => handleChange(currentCard)}
                                        />
                                    </label>
                                </li>
                            );
                        })}
                    </ul>
                    <button
                        onClick={handleSave}
                        disabled={!currentInfo || currentInfo?.card?.address === paymentInfo?.card?.address}
                        className={cn(
                            "flex items-center mt-auto justify-center self-start py-2 px-5 rounded-lg bg-primary-orange text-white",
                            (!currentInfo || currentInfo.card?.address === paymentInfo?.card?.address) && "opacity-50"
                        )}
                    >
                        Сохранить
                    </button>
                </div>
            )}
        </>
    );
};

export default PaymentUserCards;