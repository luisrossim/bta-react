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
            <main className="bg-white border md:border-none md:rounded-sm md:shadow md:m-4 px-4 mb-8 md:px-8 py-8">
               <Outlet />
            </main>
         </SidebarInset>
      </SidebarProvider>
   );
}
