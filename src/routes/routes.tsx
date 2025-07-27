import { createBrowserRouter, redirect } from "react-router-dom";
import NotFoundPage from "@/features/notfound";
import ServiceOrderPage from "@/features/order";
import MainLayout from "@/components/layout/MainLayout";
import UserPage from "@/features/user";
import UserFormPage from "@/features/user/UserFormPage";
import StagePage from "@/features/stages";
import ServiceOrderInfoPage from "@/features/order/OrderInfoPage";
import Login from "@/features/auth/pages/Login";
import AuthGuard from "@/components/layout/AuthGuard";
import ListCustomers from "@/features/customer/pages/ListCustomers";
import ViewCustomer from "@/features/customer/pages/ViewCustomer";
import CreateCustomer from "@/features/customer/pages/CreateCustomer";

const router = createBrowserRouter([
   {
      path: "/",
      loader: () => redirect("/login"),
   },
   {
      path: "/login",
      element: <Login />,
   },
   {
      path: "/sistema",
      element: (
         <AuthGuard>
            <MainLayout />
         </AuthGuard>
      ),
      children: [
         { path: "", loader: () => redirect("ordens") },

         { path: "ordens", element: <ServiceOrderPage /> },
         { path: "ordens/info/:id", element: <ServiceOrderInfoPage /> },
         
         { path: "clientes", element: <ListCustomers /> },
         { path: "clientes/form", element: <CreateCustomer /> },
         { path: "clientes/info/:id", element: <ViewCustomer /> },

         { path: "usuarios", element: <UserPage /> },
         { path: "usuarios/form", element: <UserFormPage /> },
         { path: "usuarios/form/:id", element: <UserFormPage /> },

         { path: "etapas", element: <StagePage /> }
      ],
   },
   {
      path: "404",
      element: <NotFoundPage />,
   },
   {
      path: "*",
      loader: () => redirect("/404"),
   },
]);

export default router;
