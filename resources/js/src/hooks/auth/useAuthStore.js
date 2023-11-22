import { useDispatch, useSelector } from "react-redux";
import {
    onAuthenticate,
    onClearErrores,
    onLoading,
    onLogout,
} from "../../store/auth/authSlice";
import controlApi from "../../api/controlApi";

export const useAuthStore = () => {
    const { isLoading, user, errores } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ lgin, paswrd }) => {
        try {
            dispatch(onLoading());
            const { data } = await controlApi.post("/auth/login", {
                lgin,
                paswrd,
            });
            const { user } = data;
            localStorage.setItem("user_srvm", JSON.stringify(data.user));
            localStorage.setItem("eth_token", data.access_token);
            localStorage.setItem("token_init_date", new Date().getTime());
            dispatch(onAuthenticate(user));
        } catch (error) {
            dispatch(onLogout(error.response.data.msg));
            setTimeout(() => {
                dispatch(onClearErrores());
            }, 2000);
        }
    };

    const checkAuthToken = async () => {
        const token = localStorage.getItem("eth_token");

        if (!token) return dispatch(onLogout());

        try {
            const { data } = await controlApi.get("/refresh");
            const { user } = data;
            //console.log(user);
            localStorage.setItem("user_srvm", JSON.stringify(data.user));
            localStorage.setItem("eth_token", data.access_token);
            localStorage.setItem("token_init_date", new Date().getTime());
            dispatch(onAuthenticate(user));
        } catch (error) {
            //console.log(error);
            localStorage.clear();
            dispatch(onLogout());
        }
    };

    const startLogout = async () => {
        try {
            await controlApi.post("/auth/logout");
            localStorage.clear();
            dispatch(onLogout());
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    };

    return {
        isLoading,
        user,
        errores,

        startLogin,
        checkAuthToken,
        startLogout,
    };
};
