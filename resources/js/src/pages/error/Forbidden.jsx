import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from './ErrorModule/Forbidden.module.css';


export const Forbidden = () => {
  return (
    <Container className={classes.root}>
      <div className={classes.label}>403</div>
      <Title className={classes.title}>Has encontrado un lugar secreto.</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        Desafortunadamente no tienes el permiso suficiente para acceder a este lugar.
      </Text>
      <Group justify="center">
        <Button variant="subtle" size="md">
          Regresar al inicio
        </Button>
      </Group>
    </Container>
  )
}
