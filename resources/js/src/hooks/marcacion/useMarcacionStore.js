import controlApi from "../../api/controlApi";
import { useDispatch, useSelector } from "react-redux";
import {
    //onAddMarcacion,
    onClearMarcacion,
    onErrores,
    onLoadMarcacion,
    onLoadMarcaciones,
    onLoadPDF,
    onLoading,
    //onUpdateMarcacion,
} from "../../store/marcacion/marcacionSlice";

import Swal from "sweetalert2";

export const useMarcacionStore = () => {
    const { isLoading, loadPDF, marcacion, marcaciones, tableLoad, errores } =
        useSelector((state) => state.marcacion);
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
            const mensaje = error.response.data.msg
                ? error.response.data.msg
                : error.response.data.errores
                ? Object.values(error.response.data.errores)
                : error.response.data.message
                ? error.response.data.message
                : error;
            dispatch(onErrores(mensaje));
        }
    };

    const startAddEntrada = async (marcacion, user_id) => {
        try {
            if (marcacion === null) {
                const { data } = await controlApi.post("/marcacion/entrada", {
                    user_id,
                });
                //dispatch(onAddMarcacion(marcacion));
                startLoadMarcacionToday(user_id);
                Swal.fire({
                    icon: "success",
                    text: data.msg,
                    showConfirmButton: true,
                });
                return;
            }
            const { data } = await controlApi.put(
                `/marcacion/salida/${user_id}`,
                marcacion
            );
            startLoadMarcacionToday(user_id);
            Swal.fire({
                icon: "success",
                text: data.msg,
                showConfirmButton: true,
            });
            //dispatch(onUpdateMarcacion(marcacion));
        } catch (error) {
            const mensaje = error.response.data.msg
                ? error.response.data.msg
                : error.response.data.errores
                ? Object.values(error.response.data.errores)
                : error.response.data.message
                ? error.response.data.message
                : error;
            dispatch(onErrores(mensaje));
            //console.log(error);
        }
    };

    const startExportExcelMarcacionesAdmin = async (
        fecha,
        fecha_inicio,
        fecha_fin,
        cdgo_dprtmnto,
        cdgo_usrio,
    ) => {
        try {
            dispatch(onLoadPDF(true));
            const response = await controlApi.post(
                "/export/excel/marcaciones/admin",
                { fecha, fecha_inicio, fecha_fin, cdgo_dprtmnto, cdgo_usrio },
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
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadMarcacionesAdmin = async (
        fecha,
        fecha_inicio,
        fecha_fin,
        cdgo_dprtmnto,
        cdgo_usrio,
    ) => {
        try {
            const { data } = await controlApi.post("/marcaciones/admin", {
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
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
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
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
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
            //console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.msg
                    ? error.response.data.errores
                    : Object.values(error.response.data.errores),
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startClearMarcacion = () => {
        dispatch(onClearMarcacion());
    };

    return {
        isLoading,
        loadPDF,
        marcacion,
        marcaciones,
        tableLoad,

        startLoadMarcacionToday,
        startAddEntrada,
        startExportExcelMarcacionesAdmin,
        startLoadMarcacionesAdmin,
        startLoadMarcacionesUser,
        startClearMarcacion,
        startExportPDFMarcacionUser,
    };
};
