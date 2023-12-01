import cn from "@/shared/lib/classNames";

const Spinner: React.FC<{ position: "top" | "center" | "bottom" }> = ({ position }) => {
    const positions = {
        top: "top-0",
        center: "top-[50%]",
        bottom: "bottom-0",
    };

    return (
        <span
            className={cn(
                `absolute left-[50%] ${positions[position]} w-[50px] animate-loading h-[50px] border-[5px] border-t-transparent border-solid border-primary-orange rounded-full flex items-center justify-center`
            )}
        ></span>
    );
};

export default Spinner;