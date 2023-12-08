import { useEffect } from "react";
import { Grid, Select } from "@mantine/core";
import {
    useDepartamentoStore,
    useEmployeeFormContext,
    useUsuarioStore,
} from "../../../hooks";
import { DateInput } from "@mantine/dates";

export const EnployeeForm = () => {
    const srv_user = JSON.parse(localStorage.getItem("user_srvm"));
    const form = useEmployeeFormContext();
    const { cdgo_dprtmnto } = form.values;

    const { startLoadDepartamentos, departamentos } = useDepartamentoStore();
    const { startLoadUsuarios, usuarios, activateUsuario } = useUsuarioStore();

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

    return (
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
        </Grid>
    );
};
