import React from "react";
import getImageUrl from "../../../shared/lib/helpers/getImageUrl";
import Input from "../../../shared/ui/Input/ui";
import { AppContext } from "../../../app/context";
import { debounce } from "../../../shared/lib/debounce";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const { setSearchValue, searchParams, setSearchParams } = React.useContext(AppContext);

    const [value, setValue] = React.useState("");
    
    const query = searchParams.get("query") ?? "";
    const currentPath = window.location.pathname;

    const navigate = useNavigate();

    React.useEffect(() => {
        setSearchValue(searchParams.get('query') ?? '');
        setValue('');
    }, [currentPath])

    const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        if (currentPath === "/") {
            setSearchParams((prevState) => { 
                if (!value.trim().length) {
                    prevState.delete('query');
                    setValue('');
                } else prevState.set('query', value);
                return prevState;
            }, { replace: true });
        } else setValue(value);

        handleDelay(value.trim());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleDelay = React.useCallback(debounce((value: string) => setSearchValue(value)), []);

    const handleClear = () => {
        setSearchParams((prevState) => {
            prevState.delete("query");
            return prevState;
        });
        setSearchValue("");
        setValue("");
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!value) return;
        
        navigate(`/?query=${value}`);
    };

    return (
        <form className='basis-[300px] relative' onSubmit={handleSubmit}>
            <Input
                classNames='border outline-none focus:bg-gray-100 focus:border-primary-orange border-solid border-primary-gray py-[5px] px-[40px] box-border rounded-lg w-full transition-colors duration-200'
                type='text'
                value={currentPath === "/" ? query : value}
                onChange={handleChange}
                placeholder='Поиск...'
            />
            <button title='search' type='submit' className='absolute left-2 top-[50%] translate-y-[-50%]'>
                <img src={getImageUrl("search.svg")} alt='search icon' />
            </button>
            {(!!query || !!value) && (
                <button
                    onClick={handleClear}
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