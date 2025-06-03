import { type LucideIcon } from "lucide-react";

import {
   SidebarGroup,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuItem,
   SidebarMenuButton,
} from "@/components/ui/sidebar";

export function NavRoutes({
   items,
}: {
   items: {
      label: string;
      url: string;
      icon: LucideIcon;
   }[];
}) {
   return (
      <SidebarGroup>
         <SidebarGroupLabel>Menu</SidebarGroupLabel>
         <SidebarMenu>
            {items.map((item) => (
               <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                     <a href={item.url} className="flex items-center gap-2">
                        <item.icon className="shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden">
                           {item.label}
                        </span>
                     </a>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            ))}
         </SidebarMenu>
      </SidebarGroup>
   );
}
