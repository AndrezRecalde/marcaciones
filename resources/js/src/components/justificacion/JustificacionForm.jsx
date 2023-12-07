import dayjs from "dayjs";
import { ActionIcon, Box, Grid, Select, Textarea, rem } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { BtnSubmit } from "../../components";
import { IconChevronsRight, IconClock } from "@tabler/icons-react";
import {
    useDepartamentoStore,
    useMarcacionStore,
    useTipoPermisoStore,
    useUiTipoPermiso,
    useUsuarioStore,
} from "../../hooks";
import { useEffect, useRef } from "react";

export const JustificacionForm = ({ disabled, form }) => {
    const srv_user = JSON.parse(localStorage.getItem("user_srvm"));
    const { departamentos, startLoadDepartamentos } = useDepartamentoStore();
    const { usuarios, activateUsuario, setActivateUsuario, startLoadUsuarios } = useUsuarioStore();
    const { tipos, startLoadTiposPermisos, startAddJustificacion } =
        useTipoPermisoStore();
    const { modalActionTipoPermiso } = useUiTipoPermiso();
    const { startLoadMarcacionesAdmin, storageFields } = useMarcacionStore();

    const ref_e = useRef(null);
    const ref_s = useRef(null);


    const {
        cdgo_dprtmnto,
        cdgo_usrio,
        fecha_inicio,
        hora_inicio,
        fecha_fin,
        hora_fin,
        srv_permiso_id,
        detalle,
    } = form.values;

    useEffect(() => {
        startLoadDepartamentos(srv_user.id_empresa);
        startLoadTiposPermisos();
        /* return () => {
            startClearDepartamentos();
            startClearUsuarios();
        }; */
    }, []);

    useEffect(() => {
        form.setFieldValue(
            "cdgo_usrio",
            activateUsuario?.cdgo_usrio.toString() ?? null
        );
        startLoadUsuarios(cdgo_dprtmnto);
    }, [cdgo_dprtmnto]);

    useEffect(() => {
        if (activateUsuario !== null) {
            const dt = new Date(activateUsuario.fecha);
            form.setFieldValue(
                "cdgo_dprtmnto",
                activateUsuario?.cdgo_dprtmnto.toString()
            );
            form.setFieldValue(
                "cdgo_usrio",
                activateUsuario?.cdgo_usrio.toString()
            );
            form.setFieldValue("fecha_inicio", dt);
            form.setFieldValue("fecha_fin", dt);
            return;
        }
    }, [activateUsuario]);

    const pickerControl_e = (
        <ActionIcon
            variant="subtle"
            color="gray"
            onClick={() => ref_e.current?.showPicker()}
        >
            <IconClock
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
            />
        </ActionIcon>
    );

    const pickerControl_s = (
        <ActionIcon
            variant="subtle"
            color="gray"
            onClick={() => ref_s.current?.showPicker()}
        >
            <IconClock
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
            />
        </ActionIcon>
    );

    const handleSubmit = async(e) => {
        e.preventDefault();
        startAddJustificacion(
            dayjs(fecha_inicio).format("YYYY-MM-DD"),
            hora_inicio,
            dayjs(fecha_fin).format("YYYY-MM-DD"),
            hora_fin,
            cdgo_usrio,
            srv_permiso_id,
            detalle
        );
        if (storageFields !== null) {
            const { fecha_inicio:fecha_i, fecha_fin:fecha_f, cdgo_dprtmnto: dept, cdgo_usrio: ur } = storageFields;
            await startLoadMarcacionesAdmin(
                srv_user.id_empresa,
                null,
                dayjs(fecha_i).format("YYYY-MM-DD"),
                dayjs(fecha_f).format("YYYY-MM-DD"),
                parseInt(dept),
                parseInt(ur)
            );
        }
        setActivateUsuario(null);
        form.reset();
        modalActionTipoPermiso(0);
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Grid mb={30}>
                <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
                    <Select
                        label="Departamento"
                        placeholder="Selecciona el departamento"
                        searchable
                        clearable
                        nothingFoundMessage="Nothing found..."
                        disabled={disabled}
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
                        disabled={disabled}
                        data={usuarios.map((user) => {
                            return {
                                label: user.nmbre_usrio,
                                value: user.cdgo_usrio.toString(),
                            };
                        })}
                        {...form.getInputProps("cdgo_usrio")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 8, lg: 8 }}>
                    <DateInput
                        valueFormat="YYYY-MM-DD"
                        label="Desde"
                        placeholder="Fecha inicial"
                        {...form.getInputProps("fecha_inicio")}
                        disabled={disabled}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
                    <TimeInput
                        label="Hora"
                        ref={ref_e}
                        rightSection={pickerControl_e}
                        {...form.getInputProps("hora_inicio")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 8, lg: 8 }}>
                    <DateInput
                        valueFormat="YYYY-MM-DD"
                        label="Hasta"
                        placeholder="Fecha final"
                        {...form.getInputProps("fecha_fin")}
                        disabled={disabled}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
                    <TimeInput
                        label="Hora"
                        ref={ref_s}
                        rightSection={pickerControl_s}
                        {...form.getInputProps("hora_fin")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                    <Select
                        label="Tipo de permiso"
                        placeholder="Selecciona el tipo"
                        searchable
                        clearable
                        nothingFoundMessage="Nothing found..."
                        data={tipos.map((tipo) => {
                            return {
                                label: tipo.nombre_permiso,
                                value: tipo.id.toString(),
                            };
                        })}
                        {...form.getInputProps("srv_permiso_id")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                    <Textarea
                        label="Detalle"
                        withAsterisk
                        placeholder="Input placeholder"
                        autosize
                        {...form.getInputProps("detalle")}
                    />
                </Grid.Col>
            </Grid>
            <BtnSubmit
                radius="md"
                text="Asignar"
                LeftSection={IconChevronsRight}
                fullWidth={true}
            />
        </Box>
    );
};
