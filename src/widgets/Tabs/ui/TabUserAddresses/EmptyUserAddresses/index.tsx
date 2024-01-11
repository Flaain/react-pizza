import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import { Image } from "@/shared/ui/Image";
import { EmptyUserAddressesProps } from "@/widgets/Tabs/model/interfaces";

const EmptyUserAddresses = ({ navigate, setShowAddForm }: EmptyUserAddressesProps) => {
    return (
        <div className='flex flex-col h-full'>
            <div className='flex flex-col items-center justify-center gap-2 mt-auto mb-auto'>
                <Image src={getImageUrl("empty-user-addresses.svg")} alt='empty' width={300} height={300} />
                <p className='text-gray-400'>Нет сохранненых адресов</p>
            </div>
            <div className='flex items-center gap-5'>
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
        </div>
    );
};

export default EmptyUserAddresses;