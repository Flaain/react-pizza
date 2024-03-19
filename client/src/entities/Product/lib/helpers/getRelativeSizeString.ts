export const getRelativeSizeString = (size: number, locale = navigator.language) => new Intl.NumberFormat(locale, { 
    style: "unit", 
    unit: "centimeter", 
    unitDisplay: "short" 
}).format(size);