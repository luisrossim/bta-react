import { type LucideIcon } from "lucide-react";
import {
   SidebarGroup,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuItem,
   SidebarMenuButton,
} from "@/components/ui/sidebar";

interface MenuRoutes {
   label: string;
   icon: LucideIcon;
   url: string;
}

interface SidebarRoutesProps {
   routes: MenuRoutes[]
}

export function SidebarGroupRoutes({ routes }: SidebarRoutesProps) {
   return (
      <SidebarGroup>
         <SidebarGroupLabel>Menu</SidebarGroupLabel>
         <SidebarMenu>
            {routes.map((route) => (
               <SidebarMenuItem key={route.label}>
                  <SidebarMenuButton asChild tooltip={route.label}>
                     <a href={route.url} className="flex items-center gap-2">
                        <route.icon className="shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden">
                           {route.label}
                        </span>
                     </a>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            ))}
         </SidebarMenu>
      </SidebarGroup>
   );
}
