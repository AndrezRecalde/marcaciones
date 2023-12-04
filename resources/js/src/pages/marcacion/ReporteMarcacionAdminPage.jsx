import dayjs from "dayjs";
import {
    ActionIcon,
    Box,
    Button,
    Container,
    Grid,
    Group,
    LoadingOverlay,
    rem,
} from "@mantine/core";
import { useMaterialReactTable } from "material-react-table";
import { BtnSubmit, MRTableContent, TitlePage } from "../../components";
import { DateInput } from "@mantine/dates";
import { IconDownload, IconFileTypePdf, IconFileTypeXls, IconSearch } from "@tabler/icons-react";
import { useMarcacionStore } from "../../hooks";
import { useEffect, useMemo } from "react";
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

    const table = useMaterialReactTable({
        columns,
        data: marcaciones,
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
        </Container>
    );
};
