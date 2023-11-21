import Swal from "sweetalert2";
import controlApi from "../../api/controlApi";
import { useDispatch, useSelector } from "react-redux";
import { onLoading } from "../../store/soporte/soporteSlice";

export const useSoporteStore = () => {

    const { isLoading } = useSelector(state => state.soporte);
    const dispatch = useDispatch();

    const startSendSoporte = async (detalle_incidencia, usu_alias, email, departamento) => {
        try {
            dispatch(onLoading(true));
            const { data } = await controlApi.post("/incidencias/mail", {
                detalle_incidencia,
                usu_alias,
                email,
                departamento,
            });
            Swal.fire({
                icon: "success",
                text: data.msg,
                showConfirmButton: true,
            });
            dispatch(onLoading(false));
        } catch (error) {
            dispatch(onLoading(false));
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

    return {
        isLoading,
        startSendSoporte,
    };
};
