import { createSlice } from "@reduxjs/toolkit";

export const uiActividadSlice = createSlice({
    name: "uiActividad",
    initialState: {
        isOpenModalActividad: false,
    },
    reducers: {
        onOpenModalActividad: (state) => {
            state.isOpenModalActividad = true;
        },
        onCloseModalActividad: (state) => {
            state.isOpenModalActividad = false;
        }
    },
});

export const { onOpenModalActividad, onCloseModalActividad } = uiActividadSlice.actions;
