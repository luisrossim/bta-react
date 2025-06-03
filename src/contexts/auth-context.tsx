import { createContext, useState, useEffect, type ReactNode } from "react";

interface AuthContextType {
   isAuthenticated: boolean;
   login: (token: string) => void;
   logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   useEffect(() => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
   }, []);

   const login = (token: string) => {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
   };

   const logout = () => {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
   };

   return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};

export { AuthContext, type AuthContextType, AuthProvider }