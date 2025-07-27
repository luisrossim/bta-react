import { LoginForm } from "../components/LoginForm";
import { LoginHeader } from "../components/LoginHeader";
import { WelcomeSection } from "../components/WelcomeSection";

export default function Login() {
   return (
      <div className="grid min-h-svh lg:grid-cols-2">
         <div className="flex flex-col gap-4 p-8 md:p-10">
            <LoginHeader />

            <div className="flex flex-1 items-center justify-center">
               <div className="w-full max-w-lg space-y-8">
                  <div className="flex flex-col items-start gap-2">
                     <h1 className="text-3xl md:text-4xl font-semibold">Acessar</h1>
                     <p className="text-muted-foreground">Informe suas credenciais de acesso:</p>
                  </div>

                  <LoginForm />
               </div>
            </div>
         </div>
         
         <WelcomeSection />
      </div>
   );
}
