import dayjs from "dayjs";
import { useCallback, useEffect, useMemo } from "react";
import { useMaterialReactTable } from "material-react-table";
import {
    Box,
    Container,
    LoadingOverlay,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    ActionReportPDF,
    BtnSubmit,
    DateForm,
    MRTableContent,
    MenuActionItems,
    ModalActividad,
    TitlePage,
} from "../../components";
import {
    DatesFormProvider,
    useActividadStore,
    useUiActividad,
} from "../../hooks";
import { IconSearch } from "@tabler/icons-react";
import Swal from "sweetalert2";

export const ListActividadesPage = () => {
    const srv_user = JSON.parse(localStorage.getItem("user_srvm"));
    const { modalActionActividad } = useUiActividad();

    const {
        tableLoad,
        loadPDF,
        actividades,
        startLoadActividades,
        startExportPDFActividades,
        startClearActividades,
        setActivateActividad,
        errores,
        msg
    } = useActividadStore();

    const form = useForm({
        initialValues: {
            fecha_inicio: "",
            fecha_fin: "",
        },
        validate: {
            fecha_inicio: isNotEmpty("Por favor ingrese fecha inicio"),
            fecha_fin: isNotEmpty("Por favor ingrese fecha fin"),
        },
    });

    const { fecha_inicio, fecha_fin } = form.values;

    const columns = useMemo(
        () => [
            {
                accessorFn: (row) => row.fecha, //normal accessorKey
                header: "Fecha",
                size: 80,
            },
            {
                accessorKey: "actividad",
                header: "Actividad",
                size: 200,
            },
            {
                accessorKey: "usuario", //normal accessorKey
                header: "Funcionario",
                size: 80,
            },
        ],
        []
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        startLoadActividades(
            srv_user.cdgo_usrio,
            dayjs(fecha_inicio).format("YYYY-MM-DD"),
            dayjs(fecha_fin).format("YYYY-MM-DD")
        );
    };

    const handleEditActividad = useCallback(
        (selected) => {
            setActivateActividad(selected);
            modalActionActividad(1);
        },
        [actividades]
    );

    const handleExportDataPDF = (e) => {
        e.preventDefault();
        const { errors } = form.validate();
        if (
            !errors.hasOwnProperty("fecha_inicio") ||
            !errors.hasOwnProperty("fecha_fin")
        ) {
            startExportPDFActividades(
                srv_user.cdgo_usrio,
                dayjs(fecha_inicio).format("YYYY-MM-DD"),
                dayjs(fecha_fin).format("YYYY-MM-DD")
            );
            /* console.log(
                srv_user.cdgo_usrio,
                fecha_inicio.toLocaleDateString("en-CA"),
                fecha_fin.toLocaleDateString("en-CA")
            ); */
        }
    };

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
                text: errores,
                showConfirmButton: true,
            });
            return;
        }
    }, [errores]);

    useEffect(() => {
        return () => {
            startClearActividades();
        };
    }, [fecha_inicio, fecha_fin]);

    const table = useMaterialReactTable({
        columns,
        data: actividades,
        enableRowActions: true,
        renderTopToolbarCustomActions: ({ table }) => (
            <ActionReportPDF handleExportDataPDF={handleExportDataPDF} />
        ),
        renderRowActionMenuItems: ({ closeMenu, row }) => [
            <MenuActionItems
                key={0}
                row={row}
                closeMenu={closeMenu}
                handle={handleEditActividad}
                text="Editar"
            />,
        ],
    });

    useEffect(() => {
        return () => {
            startClearActividades();
        };
    }, [fecha_inicio, fecha_fin]);

    return (
        <Container size="md" my="md">
            <TitlePage order={2} size="h2" title="Lista de actividades" />
            <DatesFormProvider form={form}>
                <Box
                    component="form"
                    onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
                >
                    <LoadingOverlay
                        visible={loadPDF}
                        zIndex={1000}
                        overlayProps={{ radius: "sm", blur: 2 }}
                    />

                    <DateForm />
                    <BtnSubmit
                        text="Revisar actividades"
                        fullWidth={true}
                        radius="sm"
                        LeftSection={IconSearch}
                    />
                </Box>
            </DatesFormProvider>

            {tableLoad ? <MRTableContent table={table} /> : null}
            <ModalActividad fecha_inicio={fecha_inicio} fecha_fin={fecha_fin} />
        </Container>
    );
};
