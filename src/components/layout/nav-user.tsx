"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Settings } from "lucide-react";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   useSidebar,
} from "@/components/ui/sidebar";
import { useAuthContext } from "@/features/auth/contexts/AuthContext";
import { getStorageItem } from "@/shared/utils/localStorage";
import { StorageKeyEnum } from "@/shared/enums/StorageKeyEnum";
import type { AuthUser } from "@/features/auth/types/Auth";

export function NavUser() {
   const { isMobile } = useSidebar();
   const { logout } = useAuthContext();
   const userLogged = getStorageItem<AuthUser>(StorageKeyEnum.AUTH);

   return (
      <SidebarMenu>
         <SidebarMenuItem>
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                     size="lg"
                     className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                     <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarFallback className="rounded-lg">
                           {userLogged?.login.slice(0, 1).toUpperCase()}
                        </AvatarFallback>
                     </Avatar>
                     <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">
                           {userLogged?.login}
                        </span>
                        <span className="truncate text-xs">
                           {userLogged?.role}
                        </span>
                     </div>
                     <Settings className="ml-auto size-4" />
                  </SidebarMenuButton>
               </DropdownMenuTrigger>

               <DropdownMenuContent
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align="end"
                  sideOffset={4}
               >
                  <DropdownMenuItem onClick={() => logout()}>
                     <LogOut /> Sair do sistema
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </SidebarMenuItem>
      </SidebarMenu>
   );
}
