import { createSlice } from "@reduxjs/toolkit";

export const actividadSlice = createSlice({
    name: "actividad",
    initialState: {
        isLoading: false,
        tableLoad: false,
        actividades: [],
        activateActividad: null,
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onLoadActividades: (state, { payload }) => {
            state.actividades = payload;
            state.isLoading = false;
            state.tableLoad = true;
        },
        onSetActivateActividad: (state, { payload }) => {
            state.activateActividad = payload;
            state.isLoading = false;
            state.errores = undefined;
        },
        onClearActividades: (state) => {
            state.actividades = [];
            state.activateActividad = null;
            state.isLoading = false;
            state.tableLoad = false;

        },
        onErrores: (state, { payload }) => {
            state.errores = payload;
            state.isLoading = false;
            state.tableLoad = false;
            state.actividades = [];
            state.activateActividad = null;
        },
    },
});

export const { onLoading, onLoadActividades, onSetActivateActividad, onClearActividades, onErrores } =
    actividadSlice.actions;
