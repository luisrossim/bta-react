import { useEffect } from "react";
import { LoginForm } from "../components/LoginForm";
import { LoginHeader } from "../components/LoginHeader";
import { WelcomeSection } from "../components/WelcomeSection";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
   const { isAuthenticated } = useAuthContext();
   const navigate = useNavigate();
   
   useEffect(() => {
      if (isAuthenticated) {
         navigate('/sistema');
      }
   }, [isAuthenticated]);

   return (
      <div className="grid min-h-svh lg:grid-cols-2">
         <div className="flex flex-col gap-4 p-4 md:p-10">
            <LoginHeader />

            <div className="flex flex-1 items-center justify-center">
               <div className="w-full max-w-lg space-y-8">
                  <div className="flex flex-col items-start gap-1">
                     <h1 className="text-3xl font-bold">Acessar</h1>
                     <p className="text-sm">Informe suas credenciais de acesso:</p>
                  </div>

                  <LoginForm />
               </div>
            </div>
         </div>
         
         <WelcomeSection />
      </div>
   );
}
