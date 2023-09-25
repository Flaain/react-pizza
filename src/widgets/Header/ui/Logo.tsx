import React from "react";
import getImageUrl from "../../../shared/lib/helpers/getImageUrl";
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link to='/' className='flex items-center gap-5 group'>
            <img
                src={getImageUrl("logo.png")}
                alt='logo'
                className='transition-transform group-hover:rotate-45 duration-200 ease-in-out'
            />
            <div className='flex flex-col'>
                <strong className='uppercase m-0 text-xl font-extrabold text-primary-black'>React Pizza</strong>
                <p className='text-gray-400 m-0'>самая вкусная пицца во вселенной</p>
            </div>
        </Link>
    );
};

export default Logo;