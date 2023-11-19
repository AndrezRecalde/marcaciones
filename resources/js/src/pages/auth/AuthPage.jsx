import { isNotEmpty, useForm } from "@mantine/form";
import {
    Text,
    Paper,
    Group,
    Divider,
    Box,
    Container,
} from "@mantine/core";
import { useAuthStore } from "../../hooks";
import { AuthForm, BtnServices, BtnSubmit, StatAlert } from "../../components";
import { IconChevronsRight, IconInfoCircle } from "@tabler/icons-react";
import classes from "./AuthPageModule/AuthPage.module.css";


export const AuthPage = () => {
    const { startLogin, errores } = useAuthStore();

    const form = useForm({
        initialValues: {
            lgin: "",
            paswrd: "",
        },

        validate: {
            lgin: isNotEmpty("Por favor ingresa el usuario"),
            paswrd: isNotEmpty("Por favor ingresa la contraseña"),
        },
    });

    const { lgin, paswrd } = form.values;

    const handleSubmit = (e) => {
        e.preventDefault();
        startLogin({ lgin, paswrd });
    };

    return (
        <div className={classes.wrapper}>
            <Container size="xs" my={50}>
                <Paper radius="md" p="xl" withBorder>
                    <Text size="lg" fw={700}>
                        Sistema de Control
                    </Text>
                    <BtnServices />
                    <Divider
                        label="Accede al sistema"
                        labelPosition="center"
                        my="lg"
                    />
                    {errores ? (
                        <StatAlert
                            text={errores}
                            variant=""
                            color="red.8"
                            icon={IconInfoCircle}
                        />
                    ) : null}

                    <Box
                        component="form"
                        style={(theme) => ({
                            padding: theme.spacing.xs,
                        })}
                        onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
                    >
                        <AuthForm form={form} />
                        <Group justify="flex-end" mt="lg">
                            <BtnSubmit
                                radius="xl"
                                text="Acceder"
                                LeftSection={IconChevronsRight}
                            />
                        </Group>
                    </Box>
                </Paper>
            </Container>
        </div>
    );
};
