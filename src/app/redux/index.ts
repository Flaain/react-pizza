export type { RootState } from "./store";
export type { Item } from "./interfaces";

export { rootSelector } from "./slices/rootSlice/selectors";
export { fetchPizzas } from "./slices/rootSlice/asyncActions";