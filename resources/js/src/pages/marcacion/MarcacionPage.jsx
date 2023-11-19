import { useEffect } from "react";
import { Container, SimpleGrid, Text, Title } from "@mantine/core";
import { useDateTime, useMarcacionStore } from "../../hooks";
import { Loading, MarcacionCard } from "../../components";
import { IconDoorEnter, IconDoorExit } from "@tabler/icons-react";

import classes from "./MarcacionModule/Marcacion.module.css";

export const MarcacionPage = () => {
    const srv_user = JSON.parse(localStorage.getItem("user_srvm"));
    const {
        isLoading,
        marcacion,
        startLoadMarcacionToday,
        startAddEntrada,
        startClearMarcacion,
        errores,
    } = useMarcacionStore();

    const { currentDate, currentTime } = useDateTime();

    useEffect(() => {
        startLoadMarcacionToday(srv_user.cdgo_usrio);

        return () => {
            startClearMarcacion();
        };
    }, []);

    useEffect(() => {}, [marcacion]);

    const handleBtnMarcacion = () => {
        startAddEntrada(marcacion, srv_user.cdgo_usrio);
    };

    return (
        <Container size="sm" my={30}>
            <Title className={classes.title} ta="center">
                Marcación En-Línea
            </Title>
            <Text c="dimmed" fz="md" ta="center">
                {currentDate}
            </Text>
            <Text c="dimmed" fz="lg" fw={900} ta="center">
                {currentTime}
            </Text>

            {isLoading ? (
                <Loading />
            ) : (
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }}>
                    <MarcacionCard
                        icon={IconDoorEnter}
                        color="teal.8"
                        title="Marcación de entrada"
                        registro={
                            marcacion?.reg_entrada
                                ? marcacion?.reg_entrada
                                : null
                        }
                        handleBtnMarcacion={handleBtnMarcacion}
                        btnTitle="Marcar entrada"
                    />

                    <MarcacionCard
                        icon={IconDoorExit}
                        color="red.8"
                        title="Marcación de salida"
                        registro={
                            marcacion?.reg_salida ? marcacion?.reg_salida : null
                        }
                        handleBtnMarcacion={handleBtnMarcacion}
                        btnTitle="Marcar salida"
                    />
                </SimpleGrid>
            )}
        </Container>
    );
};
