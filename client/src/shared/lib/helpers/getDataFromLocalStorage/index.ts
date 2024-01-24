const getDataFromLocalStorage = <T>(key: string, defaultValue: T): T => {
    try {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
        console.error(`Error while parsing ${key} from localStorage: ${error}`);
        return defaultValue;
    }
};

export default getDataFromLocalStorage;