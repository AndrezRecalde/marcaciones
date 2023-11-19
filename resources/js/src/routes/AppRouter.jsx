import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./public/PublicRoutes";
import { PrivatePages, PrivateRoutes } from "./private";
import { AuthPage } from "../pages";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {
    const { checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    return (
        <Routes>
            <Route
                path="auth/login/*"
                element={
                    <PublicRoutes>
                        <Routes>
                            <Route path="/*" element={<AuthPage />} />
                        </Routes>
                    </PublicRoutes>
                }
            />

            <Route
                path="/*"
                element={
                    <PrivateRoutes>
                        <PrivatePages />
                    </PrivateRoutes>
                }
            />
        </Routes>
    );
};
