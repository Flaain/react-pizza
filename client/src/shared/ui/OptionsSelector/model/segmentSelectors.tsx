/*

Все очень плохо, надо бы мне оторвать руки за такую типизацию, но я пока учусь

⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠉⠉⠉⠉⠉⠉⠉⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⢀⣠⣶⣶⣶⣶⣤⡀ ⠀ ⠹⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⡏⠀⠀⠀⣾⡿⢿⣿⣿⡿⢿⣿⡆ ⠀ ⢻⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡿⠃⠀⠀⠀⢿⣇⣸⣿⣿⣇⣸⡿⠃⠀⠀⠸⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠉⠛⠛⠛⠛⠉⠀⠀⠀⠀⠀⠀⠀⠙⣿⣿⣿⣿⣿
⢿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿
⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀Я НАСРАЛ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿
⣿⡟⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀МОДЕР УБЕРИ⠀ ⣧⠀⠀⠀⠀⠀ ⢿⣿
⣿⡇⠀⠀⠀⠀⠀⣾⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣧⠀⠀⠀⠀⠀⢸⣿
⣿⣇⠀⠀⣰⣶⣿⣿⣿⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣶⣆⠀⠀⢀⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⢸⣿⠇⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣤⣴⣾⣿⣶⣤⣤⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿

*/

import { Size } from "@/shared/model/interfaces";
import { Segment } from "./interfaces";

export const sizeSelector = (initialValue: string | number, value: unknown) => (value as Size).size === initialValue;
export const typeSelector = (_: string | number, availableType: unknown, index: number) => availableType === index;

export const segmentSelectors: Record<string, Segment> = {
    SET_TYPE: { availableValueIndex: typeSelector },
    SET_SIZE: {
        availableValueIndex: sizeSelector,
        title: (size: unknown) => new Intl.NumberFormat(navigator.language, { style: "unit", unit: "centimeter", unitDisplay: "short" }).format(size as number),
    },
};