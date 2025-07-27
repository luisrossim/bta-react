import { SidebarMenuButton } from "../../../ui/sidebar";

export function SidebarHeaderContent() {
   return (
      <SidebarMenuButton
         size="lg"
         className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
         <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <img
               src="/favicon.svg"
               className="brightness-0 invert saturate-0 w-[22px]"
               alt="bta-logo"
            />
         </div>
         <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">BTA Irrigação</span>
            <span className="truncate text-xs">Gestor</span>
         </div>
      </SidebarMenuButton>
   );
}
