import { useDispatch, useSelector } from "react-redux";
import { onClearUsuarios, onLoadUsuarios } from "../../store/usuarios/usuarioSlice";

import Swal from "sweetalert2";
import controlApi from "../../api/controlApi";

export const useUsuarioStore = () => {
    const { usuarios } = useSelector((state) => state.usuario);
    const dispatch = useDispatch();

    const startLoadUsuarios = async (cdgo_dprtmnto) => {
        try {
            const { data } = await controlApi.post("/usuarios", {
                cdgo_dprtmnto,
            });
            const { usuarios } = data;
            dispatch(onLoadUsuarios(usuarios));
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

    const startClearUsuarios = () => {
        dispatch(onClearUsuarios());
    }

    return {
        usuarios,
        startLoadUsuarios,
        startClearUsuarios
    };
};
