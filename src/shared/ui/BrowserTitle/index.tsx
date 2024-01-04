import React from "react";
import { BrowserTitleProps } from "@/shared/model/interfaces";

const BrowserTitle = ({ data, children }: BrowserTitleProps) => {
    React.useEffect(() => {
        document.title = `Пицца ${data.title} - ${data.description}`;
    }, [data]);

    return children;
};

export default BrowserTitle;