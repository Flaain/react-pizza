import React from "react";
import getImageUrl from "../../../shared/lib/helpers/getImageUrl";
import { Link } from "react-router-dom";
import { LogoProps } from "../interfaces";
import { AppContext } from "../../../app/context";
import getSortedArr from "../../../shared/lib/helpers/getSortedArr";
import { initialSortNames } from "../../../shared/initialValues";

const Logo: React.FC<LogoProps> = ({ title, description }) => {
    const { pizzas, setFilteredPizzas, setSearchParams, setSearchValue } = React.useContext(AppContext);

    const handleClick = () => {
        const arr = [...pizzas];
        const sortDirection = initialSortNames[0].sort.includes('-') ? -1 : 1;
        const property = initialSortNames[0].sort.replace('-', '');

        setSearchParams((prevState) => {
            prevState.forEach((value) => prevState.delete(value));
            return prevState;
        });
        setFilteredPizzas(arr.sort((a, b) => getSortedArr(a, b, sortDirection, property)));
        setSearchValue("");
    };

    return (
        <Link to='/' className='flex items-center gap-5 group' onClick={handleClick}>
            <img
                src={getImageUrl("logo.png")}
                alt='logo'
                className='transition-transform group-hover:rotate-45 duration-200 ease-in-out'
            />
            <div className='flex flex-col'>
                <strong className='uppercase m-0 text-xl font-extrabold text-primary-black'>{title}</strong>
                {description && <p className='text-gray-400 m-0'>{description}</p>}
            </div>
        </Link>
    );
};

export default Logo;