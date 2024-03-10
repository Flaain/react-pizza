import { Props } from "./model/interfaces";
import cn from "@/shared/lib/classNames";

const Container = ({
    children,
    classNames,
}: Props) => {
    return <div className={cn(classNames ?? "max-w-[1320px] relative w-full my-0 mx-auto px-[15px] box-border")}>{children}</div>;
};

export default Container;