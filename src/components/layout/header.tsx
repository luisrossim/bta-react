import { SidebarTrigger } from "../ui/sidebar";

export default function Header() {
   return (
      <header className="sticky top-0 bg-white flex border-b h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 mb-8 md:mb-2">
         <SidebarTrigger className="ml-2 p-4" />
      </header>
   );
}
