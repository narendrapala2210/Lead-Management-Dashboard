import { createContext, useState, type ReactNode } from "react";

export interface AuthContextProps {
  isAuthenticated: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const handleLogin = (): void => {
    setIsAuthenticated(true);
  };
  const handleLogout = (): void => {};
  const values: AuthContextProps = {
    isAuthenticated,
    handleLogin,
    handleLogout,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContext;
