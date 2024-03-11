import React from "react";
import cn from "@/shared/lib/classNames";
import { Props } from "../model/interfaces";

const Image = ({ skeleton, className, ...rest }: Props) => {
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [errorLoading, setErrorLoading] = React.useState(false);

    return (
        <>
            {!imageLoaded && skeleton}
            {!errorLoading && (
                <img
                    {...rest}
                    className={cn(errorLoading && "hidden", !!className && className)}
                    style={imageLoaded ? {}: {
                        width: 1,
                        height: 1,
                        padding: 0,
                        margin: -1,
                        overflow: "hidden",
                        // clip: "rect(0, 0, 0, 0)",
                        whiteSpace: "nowrap",
                        borderWidth: 0,
                        opacity: 0,
                        position: "absolute",
                    }}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setErrorLoading(true)}
                />
            )}
        </>
    );
};

export default Image;