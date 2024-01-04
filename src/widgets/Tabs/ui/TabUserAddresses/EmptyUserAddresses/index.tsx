import { EmptyUserAddressesProps } from "@/widgets/Tabs/model/interfaces";

const EmptyUserAddresses = ({ navigate, setShowAddForm }: EmptyUserAddressesProps) => {
    return (
        <>
            <p className='text-gray-400'>Нет сохранненых адресов</p>
            <div className='self-start mt-auto flex items-center gap-5'>
                <button
                    onClick={() => setShowAddForm(true)}
                    className='flex items-center justify-center self-start py-2 px-5 rounded-lg bg-primary-orange text-white mt-auto'
                >
                    Добавить адрес доставки
                </button>
                <button
                    onClick={() => navigate("/cart")}
                    className='bg-primary-orange/10 py-2 px-5 rounded-lg text-primary-orange hover:bg-primary-orange/20 transition-colors duration-200 ease-in-out'
                >
                    Отмена
                </button>
            </div>
        </>
    );
};

export default EmptyUserAddresses;