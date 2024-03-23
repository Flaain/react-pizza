import cn from "@/shared/lib/classNames";
import { CategorieItemProps } from "../../model/interfaces";

const CategorieItem = ({ activeCategory, name, handleClick, categorie }: CategorieItemProps) => {
    return (
        <li className='flex items-center justify-center'>
            <button
                onClick={() => handleClick(categorie)}
                className={cn(
                    "px-5 max-md:w-full max-md:flex max-md:items-center max-md:justify-center py-2 rounded-full cursor-pointer font-medium transition-colors duration-200 ease-in-out",
                     activeCategory === categorie
                        ? "bg-primary-black text-white"
                        : "bg-transparent text-primary-black hover:bg-primary-black hover:text-white"
                )}
            >
                {name}
            </button>
        </li>
    );
};

export default CategorieItem;