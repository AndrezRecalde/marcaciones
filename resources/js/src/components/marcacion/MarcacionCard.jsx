import { Button, Paper, Stack, Text, ThemeIcon, rem } from "@mantine/core";
import classes from "./MarcacionCard/MarcacionCard.module.css";

export const MarcacionCard = ({ icon:Icon, color, title, registro, handleBtnMarcacion, btnTitle }) => {
    console.log('clic')
    return (
        <Paper radius="md" withBorder className={classes.card} mt={30}>
            <ThemeIcon className={classes.icon} color={color} size={60} radius={60}>
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
                    {registro !== null ? registro : "Sin Marcación"}
                </Text>

                <Button
                    fullWidth
                    variant="filled"
                    color={color}
                    radius="md"
                    onClick={handleBtnMarcacion}
                    disabled={registro !== null ? 1 : 0}
                >
                    {btnTitle}
                </Button>
            </Stack>
        </Paper>
    );
};
