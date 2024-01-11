import { Params } from "./types";

export default (...args: Params) => {
    const classNames = [];

    for (let i = 0; i < args.length; i += 1) {
        typeof args[i] === "string" && classNames.push(args[i]);

        if (typeof args[i] === "object") {
            const obj = args[i] as { [key: string]: boolean };
            Object.keys(obj).forEach((className) => {
                obj[className] && classNames.push(className);
            });
        }
    }

    return classNames.join(" ");
};