import dayjs from "dayjs";
import { useMarcacionStore } from "../marcacion/useMarcacionStore";

export const useReportMarcacion = (form) => {
    const { fecha_inicio, fecha_fin, cdgo_usrio, cdgo_dprtmnto } = form.values;
    const srv_user = JSON.parse(localStorage.getItem("user_srvm"));
    const { startLoadMarcacionesAdmin, startStorageFields, startExportExcelMarcacionesAdmin, startExportPDFMarcacionesAdmin } =
        useMarcacionStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        startStorageFields(form.values);
        startLoadMarcacionesAdmin(
            srv_user.id_empresa,
            null,
            dayjs(fecha_inicio).format("YYYY-MM-DD"),
            dayjs(fecha_fin).format("YYYY-MM-DD"),
            parseInt(cdgo_dprtmnto),
            parseInt(cdgo_usrio)
        );
    };

    const handleExportDataXls = (e) => {
        e.preventDefault();
        startExportExcelMarcacionesAdmin(
            srv_user.id_empresa,
            null,
            dayjs(fecha_inicio).format("YYYY-MM-DD"),
            dayjs(fecha_fin).format("YYYY-MM-DD"),
            cdgo_dprtmnto,
            cdgo_usrio
        );
    };

    const handleExportDataPdf = (e) => {
        e.preventDefault();
        startExportPDFMarcacionesAdmin(
            srv_user.id_empresa,
            null,
            dayjs(fecha_inicio).format("YYYY-MM-DD"),
            dayjs(fecha_fin).format("YYYY-MM-DD"),
            cdgo_dprtmnto,
            cdgo_usrio
        );
    };

    return {
        handleSubmit,
        handleExportDataPdf,
        handleExportDataXls,
    };
};
