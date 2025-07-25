import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "@/features/auth/contexts/AuthContext";
import type { ReactNode } from "react";

export default function AuthGuard({ children }: { children: ReactNode}) {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <div className="m-4 p-8 bg-white rounded-sm border">{children}</div>;
}
