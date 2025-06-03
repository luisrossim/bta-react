import { LoginForm } from "@/pages/login/login-form";
import welcome from "@/assets/images/welcome.avif";

export default function LoginPage() {
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
                  <span className="text-sm font-semibold">BTA Platform</span>
               </a>
            </div>
            <div className="flex flex-1 items-center justify-center">
               <div className="w-full max-w-md">
                  <LoginForm />
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
