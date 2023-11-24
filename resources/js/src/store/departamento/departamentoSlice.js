import { createSlice } from "@reduxjs/toolkit";

export const departamentoSlice = createSlice({
    name: "departamento",
    initialState: {
        departamentos: [],
    },
    reducers: {
        onLoadDepartamentos: (state, { payload }) => {
            state.departamentos = payload;
        },
        onClearDepartamentos: (state) => {
            state.departamentos = [];
        }
    },
});

export const { onLoadDepartamentos, onClearDepartamentos } = departamentoSlice.actions;
