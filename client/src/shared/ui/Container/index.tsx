import { Props } from "./model/interfaces";

const Container = ({
    children,
    classNames = "max-w-[1320px] relative w-full my-0 mx-auto px-[15px] box-border",
}: Props) => {
    return <div className={classNames}>{children}</div>;
};

export default Container;