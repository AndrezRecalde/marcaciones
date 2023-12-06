import { createSlice } from "@reduxjs/toolkit";

export const uiTipoPermisoSlice = createSlice({
    name: "uiTipoPermiso",
    initialState: {
        isOpenModalTipoPermiso: false,
    },
    reducers: {
        onOpenModalTipoPermiso: (state) => {
            state.isOpenModalTipoPermiso = true;
        },
        onCloseModalTipoPermiso: (state) => {
            state.isOpenModalTipoPermiso = false;
        },
    },
});

export const { onOpenModalTipoPermiso, onCloseModalTipoPermiso } = uiTipoPermisoSlice.actions;
