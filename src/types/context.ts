import { TLoginRequest } from "./requests";

export type TAuthContext = {
  user: string | null;
  token: string;
  login: (data: TLoginRequest) => void;
  logOut: () => void;
  refresh: () => void;
  snack: { open: boolean; message: string };
  updateSnack: (message: string) => void;
};

export type TSnackState = {
  open: boolean;
  message: string;
};
