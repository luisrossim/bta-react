import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import Header from "./header";

export default function MainLayout() {
   return (
      <SidebarProvider>
         <AppSidebar />
         <SidebarInset>
            <Header />
            <div className="p-4 md:p-6">
               <Outlet />
            </div>
         </SidebarInset>
      </SidebarProvider>
   );
}
