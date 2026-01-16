import { apiFetch } from "./index";

interface LoginStateProps {
  email: string;
  password: string;
}

interface LoginResponse {
  status: boolean;
  message: string;
  token: string;
  data: { _id: string; email: string };
}

// POST : Login
const login = (data: LoginStateProps) =>
  apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export default { login };
