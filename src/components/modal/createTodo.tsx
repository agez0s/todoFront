import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import TodoButton from "../other/button";

import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { api } from "../../services/api";
import { useAuth } from "../../store/auth";
import TodoTextField from "../other/textfield";

interface ModalCreateProps {
  setCreate: React.Dispatch<React.SetStateAction<boolean>>;
  getTodos: () => void;
}

export const ModalCreate: React.FC<ModalCreateProps> = ({
  setCreate,
  getTodos,
}) => {
  const auth = useAuth();
  const createTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      dueat: dayjs(formData.get("dueat") as string).toISOString(),
    };
    try {
      await api.post("/v1/todo/create", data, {
        headers: { Authorization: "Bearer " + auth.token },
      });
      auth.updateSnack("Tarefa criada com sucesso");
      setCreate(false);
      getTodos();
    } catch (err) {
      auth.updateSnack("Erro ao criar tarefa");
    }
  };
  return (
    <>
      <DialogTitle sx={{ m: 0, p: 2 }}>Criar Tarefa</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => setCreate(false)}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <form id="create-todo" onSubmit={createTodo}>
            <TodoTextField
              label="Título"
              required
              name="title"
              sx={{ my: 2 }}
            />
            <TodoTextField label="Descrição" required name="description" />
            <p></p>
            <DatePicker minDate={dayjs()} name="dueat" />
          </form>
        </Box>
      </DialogContent>
      <DialogActions>
        <TodoButton autoFocus form="create-todo" type="submit">
          Criar Tarefa
        </TodoButton>
        <TodoButton onClick={() => setCreate(false)}>Fechar</TodoButton>
      </DialogActions>
    </>
  );
};
