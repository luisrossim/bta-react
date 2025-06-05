import { SidebarTrigger } from "../ui/sidebar";

export default function Header() {
   return (
      <header className="sticky top-0 bg-white flex justify-between border-b h-14 shrink-0 items-center overflow-hidden gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 mb-8 md:mb-2 z-10">
         <SidebarTrigger className="ml-2 p-4" />
         <div className="block md:hidden mr-4">
            <img width={40} src={"/favicon.svg"} />
         </div>
      </header>
   );
}
