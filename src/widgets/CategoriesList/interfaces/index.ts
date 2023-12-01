import { SetURLSearchParams } from "react-router-dom";

export interface Props {
    setSearchParams: SetURLSearchParams;
    activeCategory: number | null;
}