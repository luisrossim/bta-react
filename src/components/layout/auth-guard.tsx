import { Navigate, useLocation } from "react-router-dom";
import useAuth from "@/hooks/use-auth";
import type { JSX } from "react";
import { LoadingWrapper } from "../loading";

export default function AuthGuard({ children }: { children: JSX.Element }) {
   const { isAuthenticated, isLoading } = useAuth();
   const location = useLocation();

   if (isLoading) {
      return <LoadingWrapper />
   }

   if (!isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
   }

   return <div className="p-4 md:p-8">{children}</div>;  
}
