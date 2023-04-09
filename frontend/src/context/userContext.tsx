import { ReactNode, createContext, useState, useEffect } from "react";

interface authContextProviderProps {
  children: ReactNode;
}
interface User {
  token: string | null;
}

export const AuthContext = createContext(
  {} as {
    user: User;
    signin(token: string): void;
    signout(): void;
  }
);

export const AuthContextProvider = ({ children }: authContextProviderProps) => {
  const [user, setUser] = useState<User>({ token: null });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser({ token });
  }, []);
  const signin = (token: string) => {
    setUser({ token });
    localStorage.setItem("token", token);
  };
  const signout = () => {
    setUser({ token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  };
  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
