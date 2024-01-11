import React from "react";
import getImageUrl from "@/shared/lib/helpers/getImageUrl";
import Input from "@/shared/ui/Input/ui";
import { useNavigate, useSearchParams } from "react-router-dom";

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = React.useState(searchParams.get("search") ?? "");

    const navigate = useNavigate();

    const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setValue(value);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!value || !value.trim().length) return;

        navigate(`/?search=${value.toLowerCase()}`);

        setSearchParams((prevState) => {
            prevState.set("search", value.toLowerCase());
            return prevState;
        });
    };

    return (
        <form className='max-lg:flex-1 lg:basis-[350px] max-sm:w-full relative' onSubmit={handleSubmit}>
            <Input
                className='border outline-none focus:placeholder:opacity-0 placeholder:transition-opacity placeholder:duration-200 placeholder-ease-in-out focus:bg-gray-100 focus:border-primary-orange border-solid border-primary-gray py-[5px] px-[40px] box-border rounded-lg w-full transition-colors duration-200'
                type='search'
                name="search"
                value={value}
                onChange={handleChange}
                placeholder='Поиск...'
            />
            <button title='search' type='submit' className='absolute left-2 top-[50%] translate-y-[-50%]'>
                <img src={getImageUrl("search.svg")} alt='search icon' />
            </button>
            {!!value && (
                <button
                    onClick={() => setValue('')}
                    title='clear'
                    type='button'
                    className='absolute right-3 top-[50%] translate-y-[-50%]'
                >
                    <img src={getImageUrl("clear.svg")} alt='search icon' width={12} height={12} />
                </button>
            )}
        </form>
    );
};

export default Search;