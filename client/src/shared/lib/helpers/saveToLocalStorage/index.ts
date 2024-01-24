export default (...args: Array<{ key: string; data: unknown }>) => {
    args.forEach(({ key, data }) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    });
};