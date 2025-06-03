import type { AuthUser } from "@/models/auth";
import { authService } from "@/services/auth-service";
import { createContext, useEffect, useState, type ReactNode } from "react";

interface AuthContextType {
   isAuthenticated: boolean;
   logout: () => void;
   verify: () => void;
   setAuthOnLocalStorage: (data: AuthUser) => void;
   getAuthFromLocalStorage: () => AuthUser | undefined;
   isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
   const [isLoading, setIsLoading] = useState<boolean>(true);

   useEffect(() => {
      const user = getAuthFromLocalStorage();

      if (user) {
         setIsAuthenticated(true);
         verify();
      } else {
         setIsAuthenticated(false);
         setIsLoading(false);
      }
   }, []);


   const verify = async () => {
      try {
         await authService.verifyAccess();
         setIsAuthenticated(true);
      } catch {
         logout();
      } finally {
         setIsLoading(false);
      }
   };

   const logout = () => {
      authService.logout().finally(() => {
         localStorage.removeItem("bta-auth-userdata");
         setIsAuthenticated(false);
         setIsLoading(false);
      });
   };

   const setAuthOnLocalStorage = (data: AuthUser) => {
      localStorage.setItem("bta-auth-userdata", JSON.stringify(data));
      setIsAuthenticated(true);
      setIsLoading(false);
   };

   const getAuthFromLocalStorage = (): AuthUser | undefined => {
      const res = localStorage.getItem("bta-auth-userdata");

      if (!res) return undefined;

      try {
         return JSON.parse(res) as AuthUser;
      } catch {
         localStorage.removeItem("bta-auth-userdata");
         return undefined;
      }
   };

   return (
      <AuthContext.Provider value={{ isAuthenticated, isLoading, logout, verify, setAuthOnLocalStorage, getAuthFromLocalStorage }}>
         {children}
      </AuthContext.Provider>
   );
};


export { AuthContext, type AuthContextType, AuthProvider };
