import * as React from "react";
import { SidebarHeaderContent } from "./components/SidebarHeaderContent";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { getSidebarItems } from "./constants/SidebarItems";
import { SidebarGroupRoutes } from "./components/SidebarGroupRoutes";
import { SidebarFooterContent } from "./components/SidebarFooterContent";
import { getStorageItem } from "@/shared/utils/localStorage";
import type { AuthUser } from "@/features/auth/types/Auth";
import { STORAGE_KEYS } from "@/shared/constants/storageKeys";

export const SidebarLayout = React.memo(function SidebarLayout(props: React.ComponentProps<typeof Sidebar>) {
   const userLogged = getStorageItem<AuthUser>(STORAGE_KEYS.AUTH);
   const sidebarItems = getSidebarItems(userLogged?.role);

   return (
      <Sidebar collapsible="icon" {...props}>
         <SidebarHeader>
            <SidebarHeaderContent />
         </SidebarHeader>
         <SidebarContent>
            <SidebarGroupRoutes routes={sidebarItems} />
         </SidebarContent>
         <SidebarFooter>
            <SidebarFooterContent />
         </SidebarFooter>
      </Sidebar>
   );
});

