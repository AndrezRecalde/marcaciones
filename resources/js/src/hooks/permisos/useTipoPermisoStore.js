import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import controlApi from "../../api/controlApi";
import {
    onClearTiposPermisos,
    onLoadTiposPermisos,
} from "../../store/permiso/tipoPermisoSlice";

export const useTipoPermisoStore = () => {
    const { tipos } = useSelector((state) => state.tipoPermiso);
    const dispatch = useDispatch();

    const startLoadTiposPermisos = async () => {
        try {
            const { data } = await controlApi.get("/tipos/permisos");
            const { tipos } = data;
            dispatch(onLoadTiposPermisos(tipos));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                confirmButtonColor: "#c81d11",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.errores
                    ? Object.values(error.response.data.errores)
                    : error.response.data.message
                    ? error.response.data.message
                    : error,
            });
        }
    };

    const startAddJustificacion = async (
        fecha_inicio,
        hora_inicio,
        fecha_fin,
        hora_fin,
        cdgo_usrio,
        srv_permiso_id,
        detalle
    ) => {
        try {
            const { data } = await controlApi.post("/justificacion", {
                fecha_inicio,
                hora_inicio,
                fecha_fin,
                hora_fin,
                cdgo_usrio,
                srv_permiso_id,
                detalle,
            });
            if (data.status !== "error") {
                Swal.fire({
                    icon: "success",
                    text: data.msg,
                    showConfirmButton: true,
                });
                return;
            }
            Swal.fire({
                icon: "warning",
                text: data.msg,
                showConfirmButton: true,
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                confirmButtonColor: "#c81d11",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.errores
                    ? Object.values(error.response.data.errores)
                    : error.response.data.message
                    ? error.response.data.message
                    : error,
            });
        }
    };

    const startClearTiposPermisos = () => {
        dispatch(onClearTiposPermisos());
    };

    return {
        tipos,

        startLoadTiposPermisos,
        startAddJustificacion,
        startClearTiposPermisos,
    };
};
