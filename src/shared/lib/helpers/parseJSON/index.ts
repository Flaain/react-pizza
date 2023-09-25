const parseJSON = (key: string) => {
    if (key) {
        try {
            return JSON.parse(localStorage.getItem(key)!);
        } catch (error) {
            console.error(error);
        }
    }
    return null;
};

export default parseJSON;