import { PasswordInput, Stack, TextInput } from "@mantine/core";

export const AuthForm = ({ form }) => {
    return (
        <Stack>
            <TextInput
                withAsterisk
                label="Usuario"
                placeholder="Digite su usuario"
                radius="md"
                {...form.getInputProps("lgin")}
            />
            <PasswordInput
                withAsterisk
                label="Password"
                placeholder="Digite su contraseña"
                {...form.getInputProps("paswrd")}
                radius="md"
            />
        </Stack>
    );
};
