// import { Navigate, useLocation } from "react-router-dom";
// import useAuth from "@/hooks/use-auth";
import type { JSX } from "react";

export default function AuthGuard({ children }: { children: JSX.Element }) {
   // const { isAuthenticated } = useAuth();
   // const location = useLocation();

   // if (!isAuthenticated) {
   //    return <Navigate to="/login" state={{ from: location }} replace />;
   // }

   return children;
}
