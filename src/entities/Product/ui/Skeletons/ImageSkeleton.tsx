const ImageSkeleton = () => {
    return (
        <span className='flex bg-gray-100 w-[250px] h-[250px] mb-2 space-y-5 rounded-full relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-gray/30'></span>
    );
};

export default ImageSkeleton;