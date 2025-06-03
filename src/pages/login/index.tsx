import { LoginForm } from "@/pages/login/login-form";
import welcome from "@/assets/images/welcome.avif";
import { ErrorMessage } from "@/components/error-message";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
   const [authError, setAuthError] = useState<string | null>(null)
   const { isAuthenticated } = useAuth();
   const navigate = useNavigate();

   useEffect(() => {
      if(isAuthenticated) {
         navigate("/sistema", { replace: true })
      }
   })

   return (
      <div className="grid min-h-svh lg:grid-cols-2">
         <div className="flex flex-col gap-4 p-8 md:p-10">
            <div className="flex justify-start gap-2">
               <a href="#" className="flex items-center gap-2 font-medium">
                  <div className="bg-primary text-primary-foreground flex size-7 p-1 items-center justify-center rounded-md">
                     <img
                        src="favicon.svg"
                        className="brightness-0 invert saturate-0"
                        alt="bta-logo"
                     />
                  </div>
                  <span className="text-sm font-semibold">BTA Irrigação</span>
               </a>
            </div>
            <div className="flex flex-1 items-center justify-center">
               <div className="w-full max-w-lg space-y-8">
                  <div className="flex flex-col items-start gap-2">
                     <h1 className="text-4xl md:text-5xl font-semibold">Acessar</h1>
                     <p className="font-light">Informe suas credenciais de acesso:</p>
                  </div>

                  {authError && <ErrorMessage message={authError} /> }
                  <LoginForm setError={setAuthError} />
               </div>
            </div>
         </div>
         <div
            className="bg-muted relative hidden lg:block bg-cover bg-center hue-rotate-15"
            style={{ backgroundImage: `url(${welcome})`, backgroundPosition: "bottom" }}
         ></div>
      </div>
   );
}
