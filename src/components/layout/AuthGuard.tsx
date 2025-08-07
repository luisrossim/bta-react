import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "@/features/auth/contexts/AuthContext";
import type { ReactNode } from "react";
import { LoadingIcon } from "@/shared/components/LoadingIcon";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, verify } = useAuthContext();
  const location = useLocation();

  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
 
  useEffect(() => {
    let isMounted = true;

    const check = async () => {
      try {
        await verify();

        if (isMounted) {
          setIsValid(true);
        }
      } catch {
        if (isMounted) {
          setIsValid(false);
        }
      } finally {
        if (isMounted) {
          setIsVerifying(false);
        }
      }
    };

    check();

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  if (isVerifying) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingIcon />
      </div>
    );
  }

  if (!isAuthenticated || !isValid) {
    return  (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace
      />
    )
  }

  return (
    <>
      {children}
    </>
  )
}
