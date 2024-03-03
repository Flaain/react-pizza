import React from "react";
import CheckoutControlsAuthGuard from "../CheckoutControlsAuthGuard";

const CheckoutControls = () => {
    const [showPromocodeForm, setShowPromocodeForm] = React.useState(false);

    return (
        <>
            <button
                onClick={() => setShowPromocodeForm((prevState) => !prevState)}
                className='text-primary-black border-b border-dashed hover:text-primary-orange hover:border-primary-orange flex self-start'
            >
                {showPromocodeForm ? "У меня нет промокода" : "У меня есть промокод"}
            </button>
            {/* {showPromocodeForm && <PromocodeForm promocodes={promocodes} />} */}
            <CheckoutControlsAuthGuard />
        </>
    );
};

export default CheckoutControls;