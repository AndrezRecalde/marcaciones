import { Button, Group } from "@mantine/core";
import { IconCategory, IconMailFast } from "@tabler/icons-react";

export const BtnServices = () => {
    return (
        <Group grow mb="md" mt="md">
            <Button
                leftSection={<IconMailFast size={16} color="orange" />}
                radius="xl"
                variant="default"
            >
                Webmail
            </Button>
            <Button
                leftSection={<IconCategory size={16} color="indigo" />}
                radius="xl"
                variant="default"
            >
                Intranet
            </Button>
        </Group>
    );
};
