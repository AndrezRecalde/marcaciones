import dayjs from "dayjs";
import {
    ActionIcon,
    Box,
    Container,
    Grid,
    Group,
    LoadingOverlay,
    Menu,
    Select,
    Text,
    rem,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    IconFileTypePdf,
    IconFileTypeXls,
    IconLayersSubtract,
    IconSearch,
} from "@tabler/icons-react";
import { useMaterialReactTable } from "material-react-table";
import { useCallback, useEffect, useMemo } from "react";
import {
    useDepartamentoStore,
    useMarcacionStore,
    useUiTipoPermiso,
    useUsuarioStore,
} from "../../hooks";
import {
    BtnSubmit,
    MRTableContent,
    ModalJustificacion,
    TitlePage,
} from "../../components";
import { DateInput } from "@mantine/dates";

export const ReporteMarcacionAvanzado = () => {
    const srv_user = JSON.parse(localStorage.getItem("user_srvm"));
    const {
        marcaciones,
        tableLoad,
        loadPDF,
        startLoadMarcacionesAdmin,
        startExportExcelMarcacionesAdmin,
        startExportPDFMarcacionesAdmin,
        startStorageFields,
        startClearMarcacion,
    } = useMarcacionStore();
    const { departamentos, startLoadDepartamentos, startClearDepartamentos } =
        useDepartamentoStore();
    const {
        usuarios,
        activateUsuario,
        startLoadUsuarios,
        setActivateUsuario,
        startClearUsuarios,
    } = useUsuarioStore();

    const { modalActionTipoPermiso } = useUiTipoPermiso();

    const form = useForm({
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

    const { fecha_inicio, fecha_fin, cdgo_usrio, cdgo_dprtmnto } = form.values;

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
                    row.nombre_permiso !== null
                        ? "Justificado"
                        : row.reg_entrada !== null
                        ? row.reg_entrada
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
                    row.nombre_permiso !== null
                        ? "Justificado"
                        : row.reg_salida !== null
                        ? row.reg_salida
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

    const handleSubmit = (e) => {
        e.preventDefault();
        startLoadMarcacionesAdmin(
            srv_user.id_empresa,
            null,
            dayjs(fecha_inicio).format("YYYY-MM-DD"),
            dayjs(fecha_fin).format("YYYY-MM-DD"),
            parseInt(cdgo_dprtmnto),
            parseInt(cdgo_usrio)
        );
        startStorageFields(form.values);
        /* console.log(
            null,
            dayjs(fecha_inicio).format("YYYY-MM-DD"),
            dayjs(fecha_fin).format("YYYY-MM-DD"),
            parseInt(cdgo_dprtmnto),
            parseInt(cdgo_usrio)
        ); */
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
                    <IconFileTypeXls
                        stroke={2}
                        style={{ width: rem(24), height: rem(24) }}
                    />
                </ActionIcon>
                <ActionIcon
                    size={40}
                    variant="filled"
                    color="red.7"
                    aria-label="Exportacion pdf"
                    onClick={handleExportDataPdf}
                >
                    <IconFileTypePdf
                        stroke={2}
                        style={{ width: rem(24), height: rem(24) }}
                    />
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
                        <IconLayersSubtract
                            style={{ width: rem(14), height: rem(14) }}
                        />
                    }
                >
                    Justificar
                </Menu.Item>
            </Menu>,
        ],
    });

    useEffect(() => {
        startLoadDepartamentos(srv_user.id_empresa);
    }, []);

    useEffect(() => {
        startLoadUsuarios(cdgo_dprtmnto);
    }, [activateUsuario]);

    useEffect(() => {
        form.setFieldValue("cdgo_usrio", null);
        startLoadUsuarios(cdgo_dprtmnto);
    }, [cdgo_dprtmnto]);

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
                    <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
                        <DateInput
                            valueFormat="YYYY-MM-DD"
                            label="Fecha"
                            placeholder="Fecha inicial"
                            {...form.getInputProps("fecha_inicio")}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
                        <DateInput
                            valueFormat="YYYY-MM-DD"
                            label="Fecha"
                            placeholder="Fecha final"
                            {...form.getInputProps("fecha_fin")}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
                        <Select
                            label="Departamento"
                            placeholder="Selecciona el departamento"
                            searchable
                            clearable
                            nothingFoundMessage="Nothing found..."
                            data={departamentos.map((departamento) => {
                                return {
                                    label: departamento.nmbre_dprtmnto,
                                    value: departamento.cdgo_dprtmnto.toString(),
                                };
                            })}
                            {...form.getInputProps("cdgo_dprtmnto")}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
                        <Select
                            label="Funcionario"
                            placeholder="Selecciona al funcionario"
                            searchable
                            clearable
                            nothingFoundMessage="Nothing found..."
                            data={usuarios.map((user) => {
                                return {
                                    label: user.nmbre_usrio,
                                    value: user.cdgo_usrio.toString(),
                                };
                            })}
                            {...form.getInputProps("cdgo_usrio")}
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
