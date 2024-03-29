import { Route, Routes } from "react-router-dom";
import { AppLayout } from "../../layouts";
import {
    ActividadPage,
    Forbidden,
    JustificacionPage,
    ListActividadesPage,
    MarcacionImplicit,
    MarcacionPage,
    NotFound,
    RMAdminPage,
    ReporteMarcacionAdminPage,
    ReporteMarcacionPage,
    SoportePage,
} from "../../pages";

export const PrivatePages = () => {
    return (
        <AppLayout>
            <Routes>
                <Route path="/marcacion" element={<MarcacionPage />} />
                <Route
                    path="/reporte/marcaciones"
                    element={<ReporteMarcacionPage />}
                />
                <Route
                    path="/reporte/marcaciones/admin/tthh"
                    element={<ReporteMarcacionAdminPage />}
                />
                <Route
                    path="/reporte/avanzado/marcaciones/admin/tthh"
                    element={<RMAdminPage />}
                />

                <Route
                    path="/justificaciones/admin/tthh"
                    element={<JustificacionPage />}
                />

                <Route path="/actividad" element={<ActividadPage />} />
                <Route
                    path="/ver/actividades"
                    element={<ListActividadesPage />}
                />

                <Route path="/soporte" element={<SoportePage />} />

                <Route path="/admin/t/marcacion/implicita" element={<MarcacionImplicit />} />

                <Route path="/forbidden" element={<Forbidden />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </AppLayout>
    );
};
