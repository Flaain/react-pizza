import React from "react";
import cn from "../../../shared/lib/classNames";
import { Props } from "../interfaces";

const AddressAddForm: React.FC<Props> = ({ query, setQuery, handleSubmit, setShowAddForm }) => {
    return (
        <form className='flex flex-col justify-between h-full' onSubmit={handleSubmit}>
            <input
                className='w-full outline-none focus:border-primary-orange py-3 px-5 rounded-lg border border-solid border-primary-gray'
                value={query}
                onChange={({ target: { value } }) => setQuery(value)}
                type='text'
                name='user-address'
                placeholder='Введите адрес доставки'
            />
            <div className='flex items-center gap-5'>
                <button
                    type='submit'
                    className={cn(
                        "bg-primary-orange text-white py-2 px-5 rounded-lg",
                        !query.trim().length && "opacity-50"
                    )}
                    disabled={!query.trim().length}
                >
                    Сохранить
                </button>
                <button
                    onClick={() => setShowAddForm(false)}
                    type='button'
                    className='bg-primary-gray py-2 px-5 rounded-lg text-primary-black'
                >
                    Отмена
                </button>
            </div>
        </form>
    );
};

export default AddressAddForm;