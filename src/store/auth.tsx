import { useContext, createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router";
import { TLoginRequest } from "../types/requests";
import { api } from "../services/api";
import { TLoginResponse } from "../types/response";
import { AxiosResponse } from "axios";
import { TAuthContext, TSnackState } from "../types/context";
import { Snackbar } from "@mui/material";

const AuthContext = createContext<TAuthContext>({
  user: null,
  token: "",
  login: () => {},
  logOut: () => {},
  refresh: () => {},
  snack: { open: false, message: "" },
  updateSnack: () => {},
});

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<null | string>(null);
  const [snack, setSnack] = useState<TSnackState>({ open: false, message: "" });
  const updateSnack = (message: string) => {
    setSnack({ open: true, message });
  };
  const closeSnack = () => {
    setSnack({ open: false, message: "" });
  };
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const navigate = useNavigate();

  const login = async (data: TLoginRequest) => {
    try {
      const r = api.post("/v1/auth/login", data);
      const res: AxiosResponse<TLoginResponse> = await r;
      if (res.data) {
        setUser(res.data.data.username);
        setToken(res.data.data.token);
        localStorage.setItem("token", res.data.data.token);
        navigate("/home");
        updateSnack("Bem-vindo de volta!");
        return;
      }
    } catch (err) {
      updateSnack("Usuário ou senha inválidos");
    }
  };
  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    updateSnack("Você saiu da sua conta. Até breve!");
    navigate("/");
  };

  const refresh = async () => {
    const r = api.get("/v1/auth/profile", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const res = await r;
    if (res.data) {
      setUser(res.data.data.username);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logOut, snack, updateSnack, refresh }}
    >
      <Snackbar
        open={snack.open}
        message={snack.message}
        autoHideDuration={5000}
        onClose={closeSnack}
      />

      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
