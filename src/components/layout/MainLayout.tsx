import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SidebarLayout } from "./Sidebar";
import { GlobalHeader } from "./GlobalHeader";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
   return (
      <SidebarProvider>
         <SidebarLayout />
         <SidebarInset>
            <GlobalHeader />
            <main className="bg-white rounded-sm shadow m-1 md:m-4 p-5 md:p-8">
               <Outlet />
            </main>
         </SidebarInset>
      </SidebarProvider>
   );
}
