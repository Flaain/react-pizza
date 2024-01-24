import React from "react";
import { Props } from "../model/interfaces";

const Image = ({ skeleton, ...rest }: Props) => {
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [errorLoading, setErrorLoading] = React.useState(false);

    return (
        <div className='flex'>
            {!imageLoaded && skeleton}
            {!errorLoading && (
                <img
                    {...rest}
                    style={imageLoaded ? {} : { width: 0, height: 0, opacity: 0 }}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setErrorLoading(true)}
                />
            )}
        </div>
    );
};

export default Image;