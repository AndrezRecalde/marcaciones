import { Container, Title, Text, Button, Group } from "@mantine/core";
import { Illustration } from "./ErrorModule/Ilustration";
import { IconChevronsLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import classes from "./ErrorModule/NotFoundBackground.module.css";

export const NotFound = () => {
    const navigate = useNavigate();

    const handleRedirect = (e) => {
        e.preventDefault();
        navigate('/marcacion');
    }

    return (
        <Container className={classes.root}>
            <div className={classes.inner}>
                <Illustration className={classes.image} />
                <div className={classes.content}>
                    <Title className={classes.title}>¡Nada que ver aquí!</Title>
                    <Text
                        c="dimmed"
                        size="lg"
                        ta="center"
                        className={classes.description}
                    >
                        La página que estás intentando abrir no existe. Puede
                        que hayas escrito incorrectamente la dirección o que la
                        página se haya trasladado a otra URL. Si crees que esto
                        es un error, contacta con soporte.
                    </Text>
                    <Group justify="center">
                        <Button
                            onClick={(e) => handleRedirect(e)}
                            leftSection={<IconChevronsLeft />}
                            size="md"
                            radius="md"
                        >
                            Regresar al inicio
                        </Button>
                    </Group>
                </div>
            </div>
        </Container>
    );
};
