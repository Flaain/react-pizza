import React from "react";

const useViewport = () => {
    const [width, setWidth] = React.useState(window.innerWidth);
    
    const breakepoints = React.useMemo(() => {
        return {
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
        };
    }, []);
    
    React.useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return { width, breakepoints };
};

export default useViewport;