import React from "react";
import { Props } from "../interfaces";

const Title: React.FC<Props> = ({ title }) => <h1 className='text-primary-black text-3xl font-bold'>{title}</h1>;

export default Title;