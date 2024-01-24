type currency = "RUB" | "USD";
type style = "currency";

export interface Options {
    currency: currency;
    style: style;
    maximumFractionDigits: number;
}