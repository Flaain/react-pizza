import { TabsProps } from "../model/interfaces";

const Tabs = ({ children, className, ...rest }: TabsProps) => {
    return (
        <div {...rest} className={className}>
            {children}
        </div>
    );
};

export default Tabs;