import { createSlice } from "@reduxjs/toolkit";

export const soporteSlice = createSlice({
    name: "soporte",
    initialState: {
        isLoading: false,
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
    },
});

export const {
    onLoading
} = soporteSlice.actions;
