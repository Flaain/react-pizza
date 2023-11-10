import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../../shared/api";

export const fetchStaticAddresses = createAsyncThunk('fetchInitialDelivery/deliveryModal', async () => {
    const { data } = await api.getStaticAddresses();
    return data;
}); 