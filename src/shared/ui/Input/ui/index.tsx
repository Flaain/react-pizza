import React from "react";
import { Props } from "../interfaces";

const Input: React.FC<Props> = ({ classNames, ...props }) => {
    return <input {...props} className={classNames} />;
};

export default Input;