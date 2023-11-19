import { Text } from "@mantine/core";

export const TitleSection = ({
    color = "dimmed",
    tt = "uppercase",
    fw,
    fz = 14,
    ta = "left",
    title,
    fs = ""
}) => {
    return (
        <Text c={color} fz={fz} tt={tt} ta={ta} fw={fw} fs={fs}>
            {title}
        </Text>
    );
};
