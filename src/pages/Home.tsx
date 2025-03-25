import {
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  Dialog,
  Grid2,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import TodoButton from "../components/other/button";
import { api } from "../services/api";
import { useAuth } from "../store/auth";

import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import dayjs from "dayjs";
import golang from "../assets/images/golang.png";
import { ModalCreate } from "../components/modal/createTodo";
import { TTodo } from "../types/todos";
import { ModalEdit } from "../components/modal/editTodo";

export const HomePage: React.FC = () => {
  const auth = useAuth();
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState<null | TTodo>(null);

  const getTodos = async () => {
    const r = api.get("/v1/todo/list", {
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    });
    const res = await r;
    setTodos(res.data.data);
  };

  const markDone = async (id: number) => {
    try {
      await api.post(
        `/v1/todo/complete?id=${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      getTodos();
      auth.updateSnack("Tarefa marcada como concluída");
    } catch (err) {
      auth.updateSnack("Erro ao marcar tarefa como concluída");
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          textAlign: "center",
          my: 4,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <img src={golang} height={64} />
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {auth.user}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Você tem {todos.length} tarefas
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TodoButton startIcon={<AddIcon />} onClick={() => setCreate(true)}>
            Criar Nova
          </TodoButton>
          <TodoButton startIcon={<LogoutIcon />} onClick={() => auth.logOut()}>
            Sair
          </TodoButton>
        </Box>
      </Box>

      <Grid2 container spacing={3}>
        {todos.length === 0 && (
          <Grid2>
            <Typography variant="h6" component="h2">
              Nenhuma tarefa encontrada
            </Typography>
          </Grid2>
        )}
        {todos.length > 0 &&
          todos.map((task) => (
            <Grid2 key={task.ID} size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {task.Title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 1.5 }}
                  >
                    {task.Description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {task.Done
                      ? `Concluída em ${dayjs(task.DoneTime).format(
                          "DD/MM/YYYY"
                        )}`
                      : task.DueAt
                      ? `Data Entrega: ${dayjs(task.DueAt).format(
                          "DD/MM/YYYY"
                        )}`
                      : "Sem data de entrega"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <TodoButton
                    variant="contained"
                    color="primary"
                    disabled={task.Done}
                    onClick={() => markDone(task.ID)}
                  >
                    Marcar Completa
                  </TodoButton>
                  <TodoButton
                    size="small"
                    variant="outlined"
                    color="secondary"
                    disabled={task.Done}
                    onClick={() => setEdit(task)}
                  >
                    Editar
                  </TodoButton>
                </CardActions>
              </Card>
            </Grid2>
          ))}
      </Grid2>
      <Dialog onClose={() => setCreate(false)} open={create}>
        <ModalCreate setCreate={setCreate} getTodos={getTodos} />
      </Dialog>
      <Dialog onClose={() => setEdit(null)} open={edit !== null}>
        <ModalEdit setEdit={setEdit} getTodos={getTodos} edit={edit} />
      </Dialog>
    </Container>
  );
};
