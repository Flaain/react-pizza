export const getCuttedString = (str: string, maxLength: number) => str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
