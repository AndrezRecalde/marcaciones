import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({
    redirectPath = "/auth/login",
    children,
}) => {
    const token = localStorage.getItem("eth_token");

    return !token ? (
        <Navigate to={redirectPath} replace />
    ) : (
        children
    );
};
