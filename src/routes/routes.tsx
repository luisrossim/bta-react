import { createBrowserRouter, redirect } from "react-router-dom";
import NotFoundPage from "@/pages/notfound";
import ServiceOrderPage from "@/pages/service-order";
import MainLayout from "@/components/layout";
import LoginPage from "@/pages/login";
import CustomerPage from "@/pages/customer";
import ActivityPage from "@/pages/activity";
import UserPage from "@/pages/user";
import AuthGuard from "@/components/layout/auth-guard";

const router = createBrowserRouter([
   {
      path: "/",
      loader: () => redirect("/login"),
   },
   {
      path: "/login",
      element: <LoginPage />,
   },
   {
      path: "/sistema",
      element: (
         <AuthGuard>
            <MainLayout />
         </AuthGuard>
      )
      ,
      children: [
         { path: "", element: <ActivityPage /> },
         { path: "ordens", element: <ServiceOrderPage /> },
         { path: "clientes", element: <CustomerPage /> },
         { path: "usuarios", element: <UserPage /> }
      ],
   },
   {
      path: "*",
      element: <NotFoundPage />,
   },
]);

export default router;
