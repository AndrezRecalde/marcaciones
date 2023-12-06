import dayjs from "dayjs";
import {
    ActionIcon,
    Box,
    Container,
    Grid,
    Group,
    LoadingOverlay,
    Menu,
    Text,
    rem,
} from "@mantine/core";
import { useMaterialReactTable } from "material-react-table";
import { BtnSubmit, MRTableContent, ModalJustificacion, TitlePage } from "../../components";
import { DateInput } from "@mantine/dates";
import { IconFileTypePdf, IconFileTypeXls, IconLayersSubtract, IconSearch } from "@tabler/icons-react";
import { useMarcacionStore, useUiTipoPermiso, useUsuarioStore } from "../../hooks";
import { useCallback, useEffect, useMemo } from "react";
import { isNotEmpty, useForm } from "@mantine/form";

export const ReporteMarcacionAdminPage = () => {
    const srv_user = JSON.parse(localStorage.getItem("user_srvm"));
    const {
        startLoadMarcacionesAdmin,
        marcaciones,
        tableLoad,
        loadPDF,
        startExportExcelMarcacionesAdmin,
        startExportPDFMarcacionesAdmin,
        startClearMarcacion,
    } = useMarcacionStore();

    const { setActivateUsuario } =
        useUsuarioStore();

    const { modalActionTipoPermiso } = useUiTipoPermiso();

    const form = useForm({
        initialValues: {
            fecha: "",
        },
        validate: {
            fecha: isNotEmpty("Por favor ingrese la fecha"),
        },
    });

    const { fecha } = form.values;

    const handleSubmit = (e) => {
        e.preventDefault();
        startLoadMarcacionesAdmin(
            srv_user.id_empresa,
            dayjs(fecha).format("YYYY-MM-DD")
        );
    };

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
                accessorFn: (row) => row.reg_entrada !== null ? row.reg_entrada : row.nombre_permiso !== null ? "Justificada" : null,
                header: "Hora de Entrada",
                size: 80,
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
                accessorFn: (row) => row.reg_salida !== null ? row.reg_salida : row.nombre_permiso !== null ? "Justificada" : null,
                header: "Hora de Salida",
                size: 80,
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

    const handleExportDataXls = (e) => {
        e.preventDefault();
        startExportExcelMarcacionesAdmin(
            srv_user.id_empresa,
            dayjs(fecha).format("YYYY-MM-DD")
        );
    };

    const handleExportDataPdf = (e) => {
        e.preventDefault();
        startExportPDFMarcacionesAdmin(
            srv_user.id_empresa,
            dayjs(fecha).format("YYYY-MM-DD")
        )
        console.log('clic')
    }

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
            <Group>
                <ActionIcon
                    size={40}
                    variant="filled"
                    color="teal.5"
                    aria-label="Exportacion excel"
                    onClick={handleExportDataXls}
                >
                    <IconFileTypeXls stroke={2} style={{ width: rem(24), height: rem(24) }} />
                </ActionIcon>
                <ActionIcon
                    size={40}
                    variant="filled"
                    color="red.7"
                    aria-label="Exportacion pdf"
                    onClick={handleExportDataPdf}
                >
                    <IconFileTypePdf stroke={2} style={{ width: rem(24), height: rem(24) }} />
                </ActionIcon>
            </Group>
        ),
        renderRowActionMenuItems: ({ closeMenu, row }) => [
            <Menu key={0}>
                <Menu.Item
                    onClick={() => {
                        // View profile logic...
                        closeMenu();
                        handleJustificacion(row.original);
                    }}
                    leftSection={
                        <IconLayersSubtract style={{ width: rem(14), height: rem(14) }} />
                    }
                >
                    Justificar
                </Menu.Item>
            </Menu>,
        ],
    });

    useEffect(() => {
        return () => {
            startClearMarcacion();
        };
    }, [fecha]);

    return (
        <Container size="md" my="md">
            <TitlePage
                order={2}
                size="h2"
                title="Reporte de marcaciones de Empleados"
            />
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                <LoadingOverlay
                    visible={loadPDF}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 2 }}
                />

                <Grid grow>
                    <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                        <DateInput
                            valueFormat="YYYY-MM-DD"
                            label="Fecha"
                            placeholder="Fecha de búsqueda"
                            {...form.getInputProps("fecha")}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                        <BtnSubmit
                            text="Revisar marcaciones"
                            fullWidth={true}
                            radius="sm"
                            LeftSection={IconSearch}
                        />
                    </Grid.Col>
                </Grid>
            </Box>
            {tableLoad ? <MRTableContent table={table} /> : null}
            <ModalJustificacion />
        </Container>
    );
};
