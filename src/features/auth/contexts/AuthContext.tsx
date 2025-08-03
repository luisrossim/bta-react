import { createContext, useContext, useState, type ReactNode } from "react";
import { getStorageItem, removeStorageItem, setStorageItem } from "@/shared/utils/localStorage";
import type { AuthUser } from "../types/Auth";
import { STORAGE_KEYS } from "@/shared/constants/storageKeys";
import { useLogoutMutation, useVerifyAuthQuery } from "../hooks/useAuthApi";

interface AuthContextType {
   userLogged?: AuthUser
   isAuthenticated: boolean;
   saveLogin: (user: AuthUser) => void;
   logout: () => void;
   verify: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuthContext = (): AuthContextType => {
   const context = useContext(AuthContext);

   if (!context) {
      throw new Error("useAuthContext must be used within AuthProvider");
   }
   
   return context;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
   const userLogged = getStorageItem<AuthUser>(STORAGE_KEYS.AUTH);

   const [isAuthenticated, setIsAuthenticated] = useState(() => {
      return !!getStorageItem<AuthUser>(STORAGE_KEYS.AUTH);
   });

   const { refetch: verifyAuth } = useVerifyAuthQuery();
   const { mutate: logoutMutation } = useLogoutMutation();

   const verify = async () => {
      const result = await verifyAuth();

      if(result.error) {
         logout();
         return;
      }
      
      setIsAuthenticated(true); 
   };

   const saveLogin = (user: AuthUser) => {
      setStorageItem(STORAGE_KEYS.AUTH, user);
      setIsAuthenticated(true);
   };

   const logout = () => {
      removeStorageItem(STORAGE_KEYS.AUTH);
      setIsAuthenticated(false);
      logoutMutation();
   };

   return (
      <AuthContext.Provider value={{ userLogged, isAuthenticated, saveLogin, logout, verify }}>
         {children}
      </AuthContext.Provider>
   );
};

export {
   useAuthContext,
   AuthProvider
}