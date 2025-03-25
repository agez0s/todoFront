import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { TodoRoutes } from "./routes/routes.tsx";
import AuthProvider from "./store/auth.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4DD0E1",
    },
  },
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <AuthProvider>
            <TodoRoutes />
          </AuthProvider>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  </StrictMode>
);
