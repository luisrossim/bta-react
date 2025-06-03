import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import Header from "./header";
import { Toaster } from "../ui/sonner";
import AuthGuard from "./auth-guard";

export default function MainLayout() {
   return (
      <SidebarProvider>
         <AppSidebar />
         <SidebarInset>
            <Header />
            <AuthGuard>
               <Outlet />
            </AuthGuard>
            <Toaster richColors />
         </SidebarInset>
      </SidebarProvider>
   );
}
