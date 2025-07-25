import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getStorageItem, removeStorageItem } from "@/shared/utils/localStorage";
import type { AuthUser } from "../types/Auth";
import { StorageKeyEnum } from "@/shared/enums/StorageKeyEnum";
import { useLogoutMutation } from "../hooks/useLogoutMutation";
import { useVerifyAuthQuery } from "../hooks/useVerifyAuthQuery";

interface AuthContextType {
   isAuthenticated: boolean;
   logout: () => void;
   verify: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
   const context = useContext(AuthContext);

   if (!context) {
      throw new Error("useAuthContext must be used within AuthProvider");
   }
   
   return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(() => {
      return !!getStorageItem<AuthUser>(StorageKeyEnum.AUTH);
   });

   const { refetch: verifyAuth } = useVerifyAuthQuery();
   const { mutate: logoutMutation } = useLogoutMutation();

   useEffect(() => {
      if (isAuthenticated) {
         verify();
      }
   }, []);

   const verify = async () => {
      try {
         await verifyAuth();
         setIsAuthenticated(true);
      } catch {
         logout();
      }
   };

   const logout = () => {
      removeStorageItem(StorageKeyEnum.AUTH);
      setIsAuthenticated(false);
      logoutMutation();
   };

   return (
      <AuthContext.Provider value={{ isAuthenticated, logout, verify }}>
         {children}
      </AuthContext.Provider>
   );
};
