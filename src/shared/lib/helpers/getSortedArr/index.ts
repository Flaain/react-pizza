import { Pizza } from "../../../api/interfaces";

const getSortedArr = (a: Pizza, b: Pizza, sortDirection: number, property: string) => {
    if (typeof a[property as keyof Pizza] === "string") {
        return String(a[property as keyof Pizza]).localeCompare(String(b[property as keyof Pizza])) * sortDirection;
    } else {
        return (Number(a[property as keyof Pizza]) - Number(b[property as keyof Pizza])) * sortDirection;
    }
};

export default getSortedArr;