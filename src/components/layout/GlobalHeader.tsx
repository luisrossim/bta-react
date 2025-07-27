import { HelpCircle } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";

export function GlobalHeader() {
   return (
      <header className="sticky top-0 bg-white flex justify-between h-14 shrink-0 items-center overflow-hidden gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 mb-6 md:mb-0 border-b z-50">
         <SidebarTrigger className="ml-2 p-4" />
         <div className="flex items-center gap-4 mr-5">
            <Button size={'sm'} variant={"ghost"} className="text-muted-foreground">
               <HelpCircle className="size-3" />
               <small>Suporte</small>
            </Button>
            <img width={40} src={"/favicon.svg"} />
         </div>
      </header>
   );
}
