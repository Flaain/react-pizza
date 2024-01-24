import { configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import { rootReducer } from "./root.reducer";

export const makeStore = () => {
    enableMapSet();

    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    });
};

export const appStore = makeStore();

export type RootState = ReturnType<typeof appStore.getState>;
export type StoreDispatch = typeof appStore.dispatch;