import React from "react";
import { Props } from "../model/interfaces";

const Input: React.FC<Props> = (props) => {
    return <input {...props} />;
};

export default Input;