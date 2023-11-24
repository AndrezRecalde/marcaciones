import { Button, Paper, Stack, Text, ThemeIcon, rem } from "@mantine/core";
import classes from "./MarcacionCard/MarcacionCard.module.css";

export const MarcacionSalida = ({
    icon: Icon,
    color,
    title,
    reg_salida,
    handleBtnMarcacion,
    btnTitle,
    currentTime
}) => {
    return (
        <Paper radius="md" withBorder className={classes.card} mt={30}>
            <ThemeIcon
                className={classes.icon}
                color={color}
                size={60}
                radius={60}
            >
                <Icon
                    style={{ width: rem(32), height: rem(32) }}
                    stroke={1.7}
                />
            </ThemeIcon>

            <Stack>
                <Text ta="center" fw={700} className={classes.text}>
                    {title}
                </Text>
                <Text c="dimmed" ta="center" fw={900} fz="lg">
                    {reg_salida !== 0 ? reg_salida : "Sin Marcación"}
                </Text>

                <Button
                    fullWidth
                    variant="filled"
                    color={color}
                    radius="md"
                    onClick={handleBtnMarcacion}
                    disabled={reg_salida !== 0 || currentTime < '12:00:00' ? 1 : reg_salida}
                >
                    {btnTitle}
                </Button>
            </Stack>
        </Paper>
    );
};
