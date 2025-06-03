import * as React from "react";
import NavHeader from "./nav-header";
import { NavRoutes } from "@/components/layout/nav-main";
import { NavUser } from "@/components/layout/nav-user";
import { navItems } from "@/data/nav-data";
import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarHeader,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   return (
      <Sidebar collapsible="icon" {...props}>
         <SidebarHeader>
            <NavHeader />
         </SidebarHeader>
         <SidebarContent>
            <NavRoutes items={navItems} />
         </SidebarContent>
         <SidebarFooter>
            <NavUser />
         </SidebarFooter>
      </Sidebar>
   );
}
