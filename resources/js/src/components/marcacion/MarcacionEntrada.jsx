import { Button, Paper, Stack, Text, ThemeIcon, rem } from "@mantine/core";
import classes from "./MarcacionCard/MarcacionCard.module.css";

export const MarcacionEntrada = ({
    icon: Icon,
    color,
    title,
    reg_entrada,
    handleBtnMarcacion,
    btnTitle,
}) => {
    //console.log('clic')
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
                    {reg_entrada !== 0 ? reg_entrada : "Sin Marcación"}
                </Text>

                <Button
                    fullWidth
                    variant="filled"
                    color={color}
                    radius="md"
                    onClick={handleBtnMarcacion}
                    disabled={reg_entrada !== 0 ? 1 : reg_entrada}
                >
                    {btnTitle}
                </Button>
            </Stack>
        </Paper>
    );
};
