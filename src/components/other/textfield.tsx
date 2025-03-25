import { styled, TextField, TextFieldProps } from "@mui/material";

export const TodoTextField = styled((props: TextFieldProps) => (
  <TextField
    size="small"
    color="primary"
    slotProps={{
      input: { sx: { fontSize: "1.2rem" }, disableUnderline: true },
    }}
    {...props}
  />
))``;
export default TodoTextField;
