import { useEffect, useMemo } from "react";
import { Box, Button, Container, Grid, LoadingOverlay, rem } from "@mantine/core";
import { BtnSubmit, MRTableContent, TitlePage } from "../../components";
import { DateInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { useMaterialReactTable } from "material-react-table";
import { IconDownload, IconSearch } from "@tabler/icons-react";
import { useMarcacionStore } from "../../hooks";

export const ReporteMarcacionPage = () => {
    const srv_user = JSON.parse(localStorage.getItem("user_srvm"));
    const {
        marcaciones,
        tableLoad,
        loadPDF,
        startLoadMarcacionesUser,
        startExportPDFMarcacionUser,
        startClearMarcacion
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
                accessorKey: "reg_entrada", //normal accessorKey
                header: "Hora de Entrada",
                size: 80,
            },
            {
                accessorKey: "reg_salida",
                header: "Hora de Salida",
                size: 80,
            },
            {
                accessorKey: "usuario",
                header: "Empleado",
                size: 100,
            },
        ],
        []
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        startLoadMarcacionesUser(
            srv_user.cdgo_usrio,
            fecha_inicio.toLocaleDateString("en-CA"),
            fecha_fin.toLocaleDateString("en-CA")
        );
    };

    const handleExportDataPDF = (e) => {
        e.preventDefault();
        startExportPDFMarcacionUser(
            srv_user.cdgo_usrio,
            fecha_inicio.toLocaleDateString("en-CA"),
            fecha_fin.toLocaleDateString("en-CA")
        );
    };

    const table = useMaterialReactTable({
        columns,
        data: marcaciones,
        renderTopToolbarCustomActions: ({ table }) => (
            <Box>
                <Button
                    //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                    onClick={handleExportDataPDF}
                    leftSection={
                        <IconDownload
                            style={{ width: rem(18), height: rem(18) }}
                        />
                    }
                    color="red.8"
                    size="xs"
                    radius="sm"
                >
                    Exportar PDF
                </Button>
            </Box>
        ),
    });

    useEffect(() => {
      return () => {
        startClearMarcacion();
      }
    }, [fecha_inicio, fecha_fin]);


    return (
        <Container size="md" my="md">
            <TitlePage order={2} size="h2" title="Reporte de marcaciones" />
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
            <LoadingOverlay visible={loadPDF} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
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
