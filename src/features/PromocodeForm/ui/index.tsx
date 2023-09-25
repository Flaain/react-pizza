import React from "react";
import { Promocode } from "../../../pages/Cart/interfaces";

const PromocodeForm: React.FC<{ promocodes: Array<Promocode> }> = ({ promocodes }) => {
    const handlePromoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const promocode = formData.get("promocode")?.toString().trim();
        const promoObj = promocodes.find(({ promocode: promo }) => promo.toLowerCase() === promocode?.toLowerCase());

        if (promoObj) {
            console.log(promocode);
        } else {
            console.log("promo not found");
        }
    };

    return (
        <form className='relative flex' onSubmit={handlePromoSubmit}>
            <input
                autoFocus
                placeholder='Введите промокод'
                type='text'
                name='promocode'
                className='flex-1 outline-none placeholder:font-normal placeholder:normal-case uppercase border-primary-gray border border-solid py-2 px-5 rounded-lg focus:border-primary-orange text-primary-black font-bold'
            />
        </form>
    );
};

export default PromocodeForm;