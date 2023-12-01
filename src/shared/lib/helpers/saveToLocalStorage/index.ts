import { Args } from "./interfaces";

export default (...args: Array<Args>) => args.forEach(({ key, data }) => localStorage.setItem(key, JSON.stringify(data)));