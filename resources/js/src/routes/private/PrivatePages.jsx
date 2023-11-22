import { Route, Routes } from "react-router-dom";
import { AppLayout } from "../../layouts";
import { ActividadPage, ListActividadesPage, MarcacionPage, ReporteMarcacionAdminPage, ReporteMarcacionPage, SoportePage } from "../../pages";

export const PrivatePages = () => {
    return (
        <AppLayout>
            <Routes>
                <Route path="/marcacion" element={<MarcacionPage />} />
                <Route path="/reporte/marcaciones" element={<ReporteMarcacionPage />} />
                <Route path="/reporte/marcaciones/admin/tthh" element={<ReporteMarcacionAdminPage />} />


                <Route path="/actividad" element={<ActividadPage />} />
                <Route path="/ver/actividades" element={<ListActividadesPage />} />

                <Route path="/soporte" element={<SoportePage />} />


            </Routes>
        </AppLayout>
    );
};
