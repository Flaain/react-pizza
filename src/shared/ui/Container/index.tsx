import React from "react";
import { Props } from "./interfaces";

const Container: React.FC<Props> = ({ children, classNames = "max-w-[1320px] w-full my-0 mx-auto px-[15px] box-border" }) => {
    return <div className={classNames}>{children}</div>;
};

export default Container;