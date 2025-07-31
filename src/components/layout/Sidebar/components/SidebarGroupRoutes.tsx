import { type LucideIcon } from "lucide-react";
import {
   SidebarGroup,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuItem,
   SidebarMenuButton,
   useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

interface MenuRoutes {
   label: string;
   icon: LucideIcon;
   url: string;
}

interface SidebarRoutesProps {
   routes: MenuRoutes[]
}

export function SidebarGroupRoutes({ routes }: SidebarRoutesProps) {
   const isMobile = useIsMobile();
   const { toggleSidebar } = useSidebar();

   const handleCloseSidebar = () => {
      if(isMobile) {
         toggleSidebar();
      }
   }
    
   return (
      <SidebarGroup>
         <SidebarGroupLabel>Menu</SidebarGroupLabel>
         <SidebarMenu>
            {routes.map((route) => (
               <SidebarMenuItem key={route.label}>
                  <SidebarMenuButton 
                     asChild 
                     tooltip={route.label}
                  >
                     <Link 
                        to={route.url} 
                        className="flex items-center gap-2"
                        onClick={handleCloseSidebar}
                     >
                        <route.icon className="shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden">
                           {route.label}
                        </span>
                     </Link>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            ))}
         </SidebarMenu>
      </SidebarGroup>
   );
}
