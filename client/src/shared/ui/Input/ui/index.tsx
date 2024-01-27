import { forwardRef } from "react";
import { Props } from "../model/interfaces";

const Input = forwardRef((props: Props, ref: React.ForwardedRef<HTMLInputElement>) => {
    return <input {...props} ref={ref} />;
});

export default Input;