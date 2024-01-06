const PromocodeForm = () => {
    return (
        <form className='relative flex'>
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