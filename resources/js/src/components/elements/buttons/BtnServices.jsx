import { Button, Group } from "@mantine/core";
import { IconCategory, IconMailFast } from "@tabler/icons-react";

export const BtnServices = () => {
    return (
        <Group grow mb="md" mt="md">
            <Button
                leftSection={<IconMailFast size={16} color="orange" />}
                radius="xl"
                variant="default"
                component="a"
                href="https://www.gadpe.gob.ec/webmail"
                target="_blank"
            >
                Webmail
            </Button>
            <Button
                leftSection={<IconCategory size={16} color="indigo" />}
                radius="xl"
                variant="default"
                component="a"
                href="http://186.46.193.22:8080/intranet"
                target="_blank"
            >
                Intranet
            </Button>
        </Group>
    );
};
