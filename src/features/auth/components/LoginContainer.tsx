import { type ReactNode } from "react";
import { LoginHeader } from "../components/LoginHeader";
import welcome from "@/assets/images/welcome.avif";

interface LoginContainerProps {
   children: ReactNode
}

export default function LoginContainer({ children }: LoginContainerProps) {
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

                  {children}
               </div>
            </div>
         </div>
         
         <div
            className="bg-muted relative hidden lg:block bg-cover bg-center hue-rotate-15"
            style={{ 
               backgroundImage: `url(${welcome})`, 
               backgroundPosition: "bottom" 
            }}
         ></div>
      </div>
   );
}
