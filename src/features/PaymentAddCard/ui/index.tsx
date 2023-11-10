import React from "react";
import cn from "../../../shared/lib/classNames";
import saveToLocalStorage from "../../../shared/lib/helpers/saveToLocalStorage";

const PaymentAddCard = () => {
    const [address, setAddress] = React.useState("");
    const [cvv, setCVV] = React.useState("");
    const [expiry, setExpity] = React.useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const card = { address: Number(address), cvv: Number(cvv), expiry: new Date(expiry) };
        
        setCurrentInfo({ method: 'card', title: 'картой', card });
        setUserCards((prevState) => [...prevState, card]);
        saveToLocalStorage({ key: USER_CARDS_KEY, data: JSON.stringify([...userCards, card]) });
        setActiveMenu('choose-card');
    };

    return (
        <form className='flex flex-col gap-5 mt-5 h-full' onSubmit={handleSubmit}>
            <input
                type='number'
                name='address'
                className='w-full border-primary-gray self-start border border-solid py-2 px-5 rounded focus:border-primary-orange outline-none'
                placeholder='Введите адрес'
                value={address}
                onChange={({ target: { value } }) => setAddress(value)}
                required
            />
            <div className="flex items-center gap-5">
                <input
                    type='number'
                    name='cvv/cvc'
                    className='border-primary-gray w-[50%] border self-start border-solid py-2 px-5 rounded focus:border-primary-orange outline-none'
                    placeholder='cvv/cvc'
                    onChange={({ target: { value } }) => setCVV(value)}
                    required
                />
                <input
                    type='date'
                    name='expiry'
                    onChange={({ target: { value } }) => setExpity(value)}
                    className='border-primary-gray w-[50%] self-start border border-solid py-2 px-5 rounded focus:border-primary-orange outline-none'
                    required
                />
            </div>
            <button
                disabled={!address || !cvv || !expiry}
                className={cn(
                    "flex items-center mt-auto justify-center self-start py-2 px-5 rounded-lg bg-primary-orange text-white",
                    (!address || !cvv || !expiry) && "opacity-50"
                )}
            >
                Привязать
            </button>
        </form>
    );
};

export default PaymentAddCard;