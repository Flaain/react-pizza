import React from "react";
import getImageUrl from "../../../shared/lib/helpers/getImageUrl";
import Input from "../../../shared/ui/Input/ui";
import { AppContext } from "../../../app/context";
import { debounce } from "../../../shared/lib/debounce";
import { useLocation} from "react-router-dom";

const Search = () => {
    const { setSearchValue, searchParams, setSearchParams } = React.useContext(AppContext);
    const { pathname } = useLocation();

    const query = searchParams.get('query') ?? '';

    const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        if (pathname !== '/') return

        setSearchParams((prevState) => {
            !value.trim().length ? prevState.delete('query') : prevState.set('query', value);
            return prevState
        }, { replace: true })
        handleDelay(value.trim());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleDelay = React.useCallback(debounce((value: string) => setSearchValue(value)), []);

    const handleClear = () => {
        setSearchParams((prevState) => {
            prevState.delete('query');
            return prevState
        });
        setSearchValue('');
    }

    return (
        <form className='basis-[300px] relative'>
            <Input
                classNames='border outline-none focus:border-primary-orange border-solid border-primary-gray py-[5px] px-[40px] box-border rounded-lg w-full'
                type='text'
                value={query}
                onChange={handleChange}
                disabled={pathname !== '/'}
                placeholder='Поиск...'
            />
            <button title='search' type='button' disabled={pathname !== '/'} className='absolute left-2 top-[50%] translate-y-[-50%]'>
                <img src={getImageUrl("search.svg")} alt='search icon' />
            </button>
            {!!query && (
                <button onClick={handleClear} title='clear' type='button' className='absolute right-3 top-[50%] translate-y-[-50%]'>
                    <img src={getImageUrl("clear.svg")} alt='search icon' width={12} height={12} />
                </button>
            )}
        </form>
    );
};

export default Search;