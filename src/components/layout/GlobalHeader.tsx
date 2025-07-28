import { SidebarTrigger } from "../ui/sidebar";

export function GlobalHeader() {
   return (
      <header className="sticky top-0 bg-white flex justify-between h-14 shrink-0 items-center overflow-hidden gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 mb-6 md:mb-0 border-b z-50">
         <SidebarTrigger className="ml-2 p-4" />
         <div className="flex items-center gap-4 mr-5">
            <img width={40} src={"/favicon.svg"} />
         </div>
      </header>
   );
}
