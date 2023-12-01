import React from "react";
import { Props } from "./interfaces";

const Image: React.FC<Props> = ({ skeleton, ...props }) => {
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [errorLoading, setErrorLoading] = React.useState(false);

    return (
        <>
            {!imageLoaded && skeleton}
            {!errorLoading && (
                <img {...props} onLoad={() => setImageLoaded(true)} onError={() => setErrorLoading(true)} />
            )}
        </>
    );
};

export default Image;