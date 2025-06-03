import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

function NotFoundPage() {
   return (
      <div className="flex w-screen h-screen justify-center items-center p-8 bg-neutral-800">
         <div className="flex flex-col gap-6 border border-neutral-600/50 p-6 md:p-8 rounded-xl w-lg bg-neutral-700/50">
            <div className="flex flex-col gap-6">
               <div className="flex items-center text-rose-400">
                  <X size={22} />
                  <p>404</p>
               </div>
               <div className="border-l border-l-neutral-700">
                  <div className="px-4 py-2">
                     <h1 className="font-light text-neutral-300">
                        Página não encontrada.
                     </h1>
                  </div>
               </div>
            </div>

            <Link to={"/"}>
               <Button variant={"secondary"}>Voltar para o início</Button>
            </Link>
         </div>
      </div>
   );
}

export default NotFoundPage;
