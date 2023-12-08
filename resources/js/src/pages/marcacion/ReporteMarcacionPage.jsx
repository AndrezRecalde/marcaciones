import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import {
    ActionIcon,
    Box,
    Container,
    Grid,
    LoadingOverlay,
    Text,
    rem,
} from "@mantine/core";
import { BtnSubmit, MRTableContent, TitlePage } from "../../components";
import { DateInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { useMaterialReactTable } from "material-react-table";
import { IconFileTypePdf, IconSearch } from "@tabler/icons-react";
import { useMarcacionStore } from "../../hooks";
import Swal from "sweetalert2";

export const ReporteMarcacionPage = () => {
    const srv_user = JSON.parse(localStorage.getItem("user_srvm"));
    const {
        marcaciones,
        tableLoad,
        loadPDF,
        startLoadMarcacionesUser,
        startExportPDFMarcacionUser,
        startClearMarcacion,
        errores,
        msg
    } = useMarcacionStore();

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
                accessorFn: (row) => row.current_fecha, //normal accessorKey
                header: "Fecha",
                size: 80,
            },
            {
                accessorKey: "usuario",
                header: "Funcionario",
                size: 100,
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
        ],
        []
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        startLoadMarcacionesUser(
            srv_user.cdgo_usrio,
            dayjs(fecha_inicio).format("YYYY-MM-DD"),
            dayjs(fecha_fin).format("YYYY-MM-DD")
        );
    };

    const handleExportDataPDF = (e) => {
        e.preventDefault();
        startExportPDFMarcacionUser(
            srv_user.cdgo_usrio,
            dayjs(fecha_inicio).format("YYYY-MM-DD"),
            dayjs(fecha_fin).format("YYYY-MM-DD")
        );
    };

    const table = useMaterialReactTable({
        columns,
        data: marcaciones,
        renderTopToolbarCustomActions: ({ table }) => (
            <Box>
                <ActionIcon
                    size={40}
                    variant="filled"
                    color="red.7"
                    aria-label="Exportacion pdf"
                    onClick={handleExportDataPDF}
                >
                    <IconFileTypePdf
                        stroke={2}
                        style={{ width: rem(24), height: rem(24) }}
                    />
                </ActionIcon>
            </Box>
        ),
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
                text: errores,
                showConfirmButton: true,
            });
            return;
        }
    }, [errores]);

    useEffect(() => {
        return () => {
            startClearMarcacion();
        };
    }, [fecha_inicio, fecha_fin]);

    return (
        <Container size="md" my="md">
            <TitlePage order={2} size="h2" title="Reporte de marcaciones" />
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
                            label="Fecha inicial"
                            placeholder="Registra la fecha"
                            {...form.getInputProps("fecha_inicio")}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
                        <DateInput
                            valueFormat="YYYY-MM-DD"
                            label="Fecha final"
                            placeholder="Registra la fecha"
                            {...form.getInputProps("fecha_fin")}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                        <BtnSubmit
                            text="Revisar mis marcaciones"
                            fullWidth={true}
                            radius="sm"
                            LeftSection={IconSearch}
                        />
                    </Grid.Col>
                </Grid>
            </Box>
            {tableLoad ? <MRTableContent table={table} /> : null}
        </Container>
    );
};
