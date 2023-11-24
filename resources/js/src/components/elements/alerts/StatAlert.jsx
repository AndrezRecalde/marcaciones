import { Alert } from "@mantine/core"

export const StatAlert = ({ text, title, variant, color, icon:Icon }) => {
  return (
    <Alert mb={10} variant={variant} color={color} title={title} icon={<Icon />}>
      {text}
    </Alert>
  )
}
