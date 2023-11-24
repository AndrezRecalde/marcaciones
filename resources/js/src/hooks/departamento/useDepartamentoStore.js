import { useDispatch, useSelector } from "react-redux";
import { onClearDepartamentos, onLoadDepartamentos } from "../../store/departamento/departamentoSlice";
import Swal from "sweetalert2";
import controlApi from "../../api/controlApi";

export const useDepartamentoStore = () => {
    const { departamentos } = useSelector((state) => state.departamento);
    const dispatch = useDispatch();

    const startLoadDepartamentos = async (id_empresa) => {
        try {
            const { data } = await controlApi.post("/departamentos", {
                id_empresa,
            });
            const { departamentos } = data;
            dispatch(onLoadDepartamentos(departamentos));
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

    const startClearDepartamentos = () => {
        dispatch(onClearDepartamentos());
    };

    return {
        departamentos,

        startLoadDepartamentos,
        startClearDepartamentos
    };
};
