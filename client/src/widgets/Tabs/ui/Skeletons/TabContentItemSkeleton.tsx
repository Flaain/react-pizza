const TabContentItemSkeleton = ({ index }: { index: number }) => {
    return (
        <li
            className={`opacity-${
                index ? 100 - index * 10 : 100
            } bg-gray-100 w-full h-[80px] space-y-5 rounded-xl relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30`}
        ></li>
    );
};

export default TabContentItemSkeleton;