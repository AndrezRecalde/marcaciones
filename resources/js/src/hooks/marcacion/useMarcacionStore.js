import controlApi from "../../api/controlApi";
import { useDispatch, useSelector } from "react-redux";
import {
    //onAddMarcacion,
    onClearMarcacion,
    onErrores,
    onLoadMarcacion,
    onLoadMarcaciones,
    onLoadMessage,
    onLoadPDF,
    onLoading,
    onSavedStorageFields,
    //onUpdateMarcacion,
} from "../../store/marcacion/marcacionSlice";

export const useMarcacionStore = () => {
    const {
        isLoading,
        loadPDF,
        marcacion,
        marcaciones,
        storageFields,
        tableLoad,
        errores,
        msg,
    } = useSelector((state) => state.marcacion);
    const dispatch = useDispatch();

    const startLoadMarcacionToday = async (user_id) => {
        dispatch(onLoading());
        try {
            const { data } = await controlApi.post("/marcacion/today", {
                user_id,
            });
            const { marcacion } = data;
            //console.log(marcacion);
            dispatch(onLoadMarcacion(marcacion));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAddSalida = async (user_id) => {
        try {
            const { data } = await controlApi.post(`/marcacion/salida`, {
                user_id,
            });
            if (data.status === "success") {
                startLoadMarcacionToday(user_id);
            }
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            ExceptionMessageError(error);
            //console.log(error);
        }
    };

    const startAddEntrada = async (user_id) => {
        try {
            const { data } = await controlApi.post("/marcacion/entrada", {
                user_id,
            });
            if (data.status === "success") {
                startLoadMarcacionToday(user_id);
            }
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            ExceptionMessageError(error);
            //console.log(error);
        }
    };

    const startExportExcelMarcacionesAdmin = async (
        id_empresa,
        fecha,
        fecha_inicio,
        fecha_fin,
        cdgo_dprtmnto,
        cdgo_usrio
    ) => {
        try {
            dispatch(onLoadPDF(true));
            const response = await controlApi.post(
                "/export/excel/marcaciones/admin",
                {
                    id_empresa,
                    fecha,
                    fecha_inicio,
                    fecha_fin,
                    cdgo_dprtmnto,
                    cdgo_usrio,
                },
                { responseType: "blob" }
            );
            const url = window.URL.createObjectURL(
                new Blob([response.data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;",
                })
            );
            window.open(url, "_blank");
            dispatch(onLoadPDF(false));
        } catch (error) {
            ExceptionMessageError(error);
        }
    };

    const startLoadMarcacionesAdmin = async (
        id_empresa,
        fecha,
        fecha_inicio,
        fecha_fin,
        cdgo_dprtmnto,
        cdgo_usrio
    ) => {
        try {
            const { data } = await controlApi.post("/marcaciones/admin", {
                id_empresa,
                fecha,
                fecha_inicio,
                fecha_fin,
                cdgo_dprtmnto,
                cdgo_usrio,
            });
            //console.log(data);
            const { marcaciones } = data;
            dispatch(onLoadMarcaciones(marcaciones));
        } catch (error) {
            ExceptionMessageError(error);
        }
    };

    const startLoadMarcacionesUser = async (
        user_id,
        fecha_inicio,
        fecha_fin
    ) => {
        try {
            const { data } = await controlApi.post("/marcaciones/user", {
                user_id,
                fecha_inicio,
                fecha_fin,
            });
            const { marcaciones } = data;
            dispatch(onLoadMarcaciones(marcaciones));
        } catch (error) {
            //console.log(error)
            ExceptionMessageError(error);
        }
    };

    const startExportPDFMarcacionUser = async (
        user_id,
        fecha_inicio,
        fecha_fin
    ) => {
        try {
            dispatch(onLoadPDF(true));
            const response = await controlApi.post(
                "/export/pdf/marcaciones/user",
                {
                    user_id,
                    fecha_inicio,
                    fecha_fin,
                },
                { responseType: "blob" }
            );
            const url = window.URL.createObjectURL(
                new Blob([response.data], { type: "application/pdf" })
            );
            window.open(url, "_blank");
            dispatch(onLoadPDF(false));
        } catch (error) {
            ExceptionMessageError(error);
        }
    };

    const startExportPDFMarcacionesAdmin = async (
        id_empresa,
        fecha,
        fecha_inicio,
        fecha_fin,
        cdgo_dprtmnto,
        cdgo_usrio
    ) => {
        try {
            dispatch(onLoadPDF(true));
            const response = await controlApi.post(
                "/export/pdf/marcaciones/admin",
                {
                    id_empresa,
                    fecha,
                    fecha_inicio,
                    fecha_fin,
                    cdgo_dprtmnto,
                    cdgo_usrio,
                },
                { responseType: "blob" }
            );
            const url = window.URL.createObjectURL(
                new Blob([response.data], { type: "application/pdf" })
            );
            window.open(url, "_blank");
            dispatch(onLoadPDF(false));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startStorageFields = (seleccion) => {
        dispatch(onSavedStorageFields({ ...seleccion }));
    };

    const startClearMarcacion = () => {
        dispatch(onClearMarcacion());
    };

    const ExceptionMessageError = (error) => {
        const mensaje = error.response.data.msg
            ? error.response.data.msg
            : error.response.data.errores
            ? Object.values(error.response.data.errores)
            : error.response.data.message
            ? error.response.data.message
            : error;
        dispatch(onErrores(mensaje));
        setTimeout(() => {
            dispatch(onErrores(undefined));
        }, 40);
    };

    return {
        isLoading,
        loadPDF,
        marcacion,
        marcaciones,
        storageFields,
        tableLoad,
        errores,
        msg,

        startLoadMarcacionToday,
        startAddEntrada,
        startAddSalida,
        startExportExcelMarcacionesAdmin,
        startLoadMarcacionesAdmin,
        startLoadMarcacionesUser,
        startClearMarcacion,
        startExportPDFMarcacionUser,
        startExportPDFMarcacionesAdmin,
        startStorageFields,
    };
};
