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
import { TEditTodo, TTodo } from "../../types/todos";

interface ModalEditProps {
  setEdit: React.Dispatch<React.SetStateAction<TTodo | null>>;
  edit: TTodo | null;
  getTodos: () => void;
}

export const ModalEdit: React.FC<ModalEditProps> = ({
  setEdit,
  getTodos,
  edit,
}) => {
  const auth = useAuth();
  const editTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!edit) return;
    const data: TEditTodo = {
      id: edit.ID,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
    };
    if (formData.get("dueat")) {
      data["dueat"] = dayjs(formData.get("dueat") as string).toISOString();
    }
    try {
      await api.patch("/v1/todo/update", data, {
        headers: { Authorization: "Bearer " + auth.token },
      });
      auth.updateSnack("Tarefa modificada");
      setEdit(null);
      getTodos();
    } catch (err) {
      auth.updateSnack("Erro ao editar tarefa");
    }
  };
  return (
    <>
      <DialogTitle sx={{ m: 0, p: 2 }}>Editar Tarefa</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => setEdit(null)}
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
          <form id="edit-todo" onSubmit={editTodo}>
            <TodoTextField
              label="Título"
              required
              name="title"
              defaultValue={edit?.Title}
              sx={{ my: 2 }}
            />
            <TodoTextField
              label="Descrição"
              required
              name="description"
              defaultValue={edit?.Description}
            />
            <p></p>
            <DatePicker
              minDate={dayjs()}
              name="dueat"
              defaultValue={edit?.DueAt ? dayjs(edit?.DueAt) : null}
            />
          </form>
        </Box>
      </DialogContent>
      <DialogActions>
        <TodoButton autoFocus form="edit-todo" type="submit">
          Salvar
        </TodoButton>
        <TodoButton onClick={() => setEdit(null)}>Fechar</TodoButton>
      </DialogActions>
    </>
  );
};
