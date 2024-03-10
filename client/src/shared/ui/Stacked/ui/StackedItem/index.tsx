const StackedItem = ({ children }: { children: React.ReactNode }) => {
    return (
        <li className='w-16 h-16 relative rounded-full border-2 border-solid border-white shrink-0 overflow-hidden'>
            {children}
        </li>
    );
};