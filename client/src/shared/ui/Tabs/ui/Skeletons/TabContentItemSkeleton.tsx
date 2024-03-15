const opacity = {
    0: "opacity-100",
    1: "opacity-90",
    2: "opacity-80",
    3: "opacity-70",
    4: "opacity-60",
}; // сделал так, потому что tailwind не поддерживает вот такую запись `opacity-${index ? 100 - index * 10 : 100}`. Нужно всегда строго полные значения передавать.

const TabContentItemSkeleton = ({ index }: { index: number }) => {
    return (
        <li
            className={`${
                opacity[index as keyof typeof opacity]
            } bg-gray-100 w-full h-[80px] space-y-5 rounded-xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30`}
        ></li>
    );
};

export default TabContentItemSkeleton;