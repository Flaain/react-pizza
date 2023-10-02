import React from "react";
import getImageUrl from "../../../shared/lib/helpers/getImageUrl";
import { Link } from "react-router-dom";
import { LogoProps } from "../interfaces";

const Logo: React.FC<LogoProps> = ({ title, description }) => {
    return (
        <Link to='/' className='flex items-center gap-5 group'>
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