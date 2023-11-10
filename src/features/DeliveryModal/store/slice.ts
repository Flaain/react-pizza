import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { fetchStaticAddresses } from "./asyncActions";

export const deliveryModalSlice = createSlice({
    name: "deliveryModal",
    initialState,
    reducers: {
        clearDeliveryModalStore: (state) => {
            state.deliveryMethods = state.deliveryMethods.map((method) => {
                if (method.name === "Самовывозом") {
                    return {
                        ...method,
                        addresses: []
                    };
                }
                return method;
            });
            state.error = null;
            state.loading = true;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchStaticAddresses.fulfilled, (state, action) => {
                state.deliveryMethods = state.deliveryMethods.map((method) => {
                    if (method.name === "Самовывозом") {
                        return {
                            ...method,
                            addresses: action.payload,
                        };
                    }
                    return method;
                });
                state.loading = false;
            })
            .addCase(fetchStaticAddresses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    },
});

export const { clearDeliveryModalStore } = deliveryModalSlice.actions;