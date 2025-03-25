import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import golang from "../assets/images/golang.png";
import TodoButton from "../components/other/button";
import TodoTextField from "../components/other/textfield";
import { api } from "../services/api";
import { useAuth } from "../store/auth";
import { TCreateUserResponse } from "../types/response";

export const LoginPage: React.FC = () => {
  const auth = useAuth();
  const [signup, setSignup] = useState<boolean>(false);
  const subForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    if (signup) {
      const r: TCreateUserResponse = await api.post("/v1/auth/newUser", data);
      if (r.data) {
        auth.updateSnack("Usuário criado com sucesso");
        setSignup(false);
      }
    } else {
      auth.login(data);
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            border: "2px solid black",
            borderRadius: 4,
            textAlign: "center",
            p: 4,
            background: !signup
              ? "linear-gradient(white, #f0eaff)"
              : "linear-gradient(white, #eafff0)",
          }}
        >
          <img src={golang} height={64} />
          <Typography variant="h4">
            {signup ? "Novo Usuário" : "TodoGo "}
          </Typography>
          <form onSubmit={subForm}>
            <Box
              sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TodoTextField label="E-mail" name="username" required />
              <TodoTextField
                required
                label="Senha"
                type="password"
                name="password"
                sx={{ mt: 2 }}
              />
              <Box sx={{ display: "flex", gap: 2, margin: "0 auto" }}>
                <TodoButton type="submit">
                  {signup ? "Salvar" : "Entrar"}
                </TodoButton>
                <TodoButton type="button" onClick={() => setSignup(!signup)}>
                  {signup ? "Voltar" : "Cadastrar"}
                </TodoButton>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};
