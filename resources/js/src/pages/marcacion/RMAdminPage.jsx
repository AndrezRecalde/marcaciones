import { useCallback, useEffect, useMemo } from "react";
import { Box, Container, LoadingOverlay, Text } from "@mantine/core";
import { isNotEmpty } from "@mantine/form";
import { useMaterialReactTable } from "material-react-table";
import {
    EmployeeFormProvider,
    useEmployeeForm,
    useMarcacionStore,
    useReportMarcacion,
    useUiTipoPermiso,
    useUsuarioStore,
} from "../../hooks";
import {
    ActionsReport,
    BtnSubmit,
    EnployeeForm,
    MRTableContent,
    MenuActionItems,
    ModalJustificacion,
    TitlePage,
} from "../../components";
import { IconSearch } from "@tabler/icons-react";
import Swal from "sweetalert2";

export const RMAdminPage = () => {
    const {
        marcaciones,
        tableLoad,
        loadPDF,
        startClearMarcacion,
        errores,
        msg,
    } = useMarcacionStore();
    const { setActivateUsuario } = useUsuarioStore();
    const { modalActionTipoPermiso } = useUiTipoPermiso();

    const form = useEmployeeForm({
        initialValues: {
            fecha_inicio: "",
            fecha_fin: "",
            cdgo_dprtmnto: null,
            cdgo_usrio: null,
        },
        validate: {
            fecha_inicio: isNotEmpty("Por favor ingrese la fecha inicial"),
            fecha_fin: isNotEmpty("Por favor ingrese la fecha final"),
            //cdgo_dprtmnto: isNotEmpty("Seleccione el departamento"),
        },
        transformValues: (values) => ({
            cdgo_dprtmnto: parseInt(values.cdgo_dprtmnto) || 0,
            cdgo_usrio: parseInt(values.cdgo_usrio) || 0,
        }),
    });

    const { handleSubmit, handleExportDataPdf, handleExportDataXls } =
        useReportMarcacion(form);

    const { fecha_inicio, fecha_fin, cdgo_usrio, cdgo_dprtmnto } = form.values;

    /* Columnas de Tabla */
    const columns = useMemo(
        () => [
            {
                accessorFn: (row) => row.current_fecha, //normal accessorKey
                header: "Fecha",
                size: 80,
            },
            {
                accessorKey: "usuario",
                header: "Empleado",
                size: 80,
            },
            {
                accessorFn: (row) =>
                    row.reg_entrada !== null
                        ? row.reg_entrada
                        : row.nombre_permiso !== null
                        ? "Justificado"
                        : null,
                header: "Hora de Entrada",
                size: 50,
                Cell: ({ cell }) => (
                    <Text
                        size="sm"
                        c={
                            cell.row.original.reg_entrada > "08:01"
                                ? "red.7"
                                : "black"
                        }
                    >
                        {cell.getValue()}
                    </Text>
                ),
            },
            {
                accessorFn: (row) =>
                    row.reg_salida !== null
                        ? row.reg_salida
                        : row.nombre_permiso !== null
                        ? "Justificado"
                        : null,
                header: "Hora de Salida",
                size: 50,
                Cell: ({ cell }) => (
                    <Text
                        size="sm"
                        c={
                            cell.row.original.reg_salida < "16:00"
                                ? "red.7"
                                : "black"
                        }
                    >
                        {cell.getValue()}
                    </Text>
                ),
            },
            {
                accessorKey: "nombre_permiso",
                header: "Tipo Permiso",
                size: 80,
            },
            {
                accessorKey: "departamento",
                header: "Departamento",
                size: 80,
            },
        ],
        []
    );

    const handleJustificacion = useCallback(
        (selected) => {
            setActivateUsuario(selected);
            modalActionTipoPermiso(1);
        },
        [marcaciones]
    );

    const table = useMaterialReactTable({
        columns,
        data: marcaciones,
        initialState: { columnVisibility: { nombre_permiso: false } },
        enableRowActions: true,
        renderTopToolbarCustomActions: ({ table }) => (
            <ActionsReport
                handleExportDataPdf={handleExportDataPdf}
                handleExportDataXls={handleExportDataXls}
            />
        ),
        renderRowActionMenuItems: ({ closeMenu, row }) => [
            <MenuActionItems
                key={0}
                row={row}
                closeMenu={closeMenu}
                handle={handleJustificacion}
                text="Justificar"
            />,
        ],
    });

    useEffect(() => {
        if (msg !== undefined) {
            Swal.fire({
                icon: msg.status,
                text: msg.msg,
                showConfirmButton: true,
            });
            return;
        }
    }, [msg]);

    useEffect(() => {
        if (errores !== undefined) {
            Swal.fire({
                icon: "error",
                title: "Contáctese con el administrador",
                text: errores,
                showConfirmButton: false,
            });
            return;
        }
    }, [errores]);

    useEffect(() => {
        return () => {
            startClearMarcacion();
        };
    }, [fecha_inicio, fecha_fin, cdgo_usrio, cdgo_dprtmnto]);

    return (
        <Container size="lg" my="md">
            <TitlePage
                order={2}
                size="h2"
                title="Reporte de marcaciones avanzado"
            />
            <EmployeeFormProvider form={form}>
                <Box
                    component="form"
                    onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
                >
                    <LoadingOverlay
                        visible={loadPDF}
                        zIndex={1000}
                        overlayProps={{ radius: "sm", blur: 2 }}
                    />
                    <EnployeeForm />
                    <BtnSubmit
                        text="Revisar marcaciones"
                        fullWidth={true}
                        radius="sm"
                        LeftSection={IconSearch}
                    />
                </Box>
            </EmployeeFormProvider>
            {tableLoad ? <MRTableContent table={table} /> : null}
            <ModalJustificacion />
        </Container>
    );
};
