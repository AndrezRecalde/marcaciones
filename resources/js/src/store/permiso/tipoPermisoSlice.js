import { createSlice } from "@reduxjs/toolkit";


export const tipoPermisoSlice = createSlice({
    name: "tiposPermisos",
    initialState: {
        tipos: [],
    },
    reducers: {
        onLoadTiposPermisos: (state, { payload }) => {
            state.tipos = payload;
        },
        onClearTiposPermisos: (state) => {
            state.tipos = [];
        }
    },
});

export const { onLoadTiposPermisos, onClearTiposPermisos } = tipoPermisoSlice.actions;
