import { useDispatch, useSelector } from "react-redux";
import {
    onClearActividades,
    onLoadActividades,
    onSetActivateActividad,
} from "../../store/actividad/actividadSlice";
import controlApi from "../../api/controlApi";
import Swal from "sweetalert2";

export const useActividadStore = () => {
    const { isLoading, actividades, activateActividad, tableLoad, errores } =
        useSelector((state) => state.actividad);

    const dispatch = useDispatch();

    const startLoadActividades = async (user_id, fecha_inicio, fecha_fin) => {
        try {
            const { data } = await controlApi.post("/get/actividades", {
                user_id,
                fecha_inicio,
                fecha_fin,
            });
            const { actividades } = data;
            dispatch(onLoadActividades(actividades));
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startAddActividad = async (actividad, fecha_inicio, fecha_fin) => {
        try {
            if (actividad.id) {
                const { data } = await controlApi.put(
                    `/update/actividad/${actividad.id}`,
                    actividad
                );
                Swal.fire({
                    icon: "success",
                    text: data.msg,
                    showConfirmButton: false,
                    timer: 1000,
                });
                startLoadActividades(
                    actividad.cdgo_usrio,
                    fecha_inicio.toLocaleDateString("en-CA"),
                    fecha_fin.toLocaleDateString("en-CA")
                );
                setClearActivateActividad();
                return;
            }
            const { data } = await controlApi.post(
                "/create/actividad",
                actividad
            );
            Swal.fire({
                icon: "success",
                text: data.msg,
                showConfirmButton: false,
                timer: 1000,
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startExportPDFActividades = async (
        user_id,
        fecha_inicio,
        fecha_fin
    ) => {
        try {
            const response = await controlApi.post(
                "/export/pdf/actividades",
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
        } catch (error) {
            console.log(error);
            /* Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.msg
                    ? error.response.data.errores
                    : Object.values(error.response.data.errores),
                confirmButtonColor: "#c81d11",
            }); */
        }
    };

    const setActivateActividad = (actividad) => {
        dispatch(onSetActivateActividad(actividad));
    };

    const setClearActivateActividad = () => {
        dispatch(onSetActivateActividad(null));
    };

    const startClearActividades = () => {
        dispatch(onClearActividades());
    };

    return {
        isLoading,
        actividades,
        activateActividad,
        tableLoad,
        errores,

        startAddActividad,
        setActivateActividad,
        setClearActivateActividad,
        startClearActividades,
        startLoadActividades,
        startExportPDFActividades,
    };
};
