import { createBrowserRouter, redirect } from "react-router-dom";
import NotFoundPage from "@/shared/components/NotFound";
import MainLayout from "@/components/layout/MainLayout";
import Login from "@/features/auth/pages/Login";
import AuthGuard from "@/components/layout/AuthGuard";
import ListCustomers from "@/features/customer/pages/ListCustomers";
import ViewCustomer from "@/features/customer/pages/ViewCustomer";
import CreateCustomer from "@/features/customer/pages/CreateCustomer";
import ViewOrder from "@/features/order/pages/ViewOrder";
import ListOrders from "@/features/order/pages/ListOrders";
import ListAssociates from "@/features/stages/pages/ListAssociates";
import CreateUser from "@/features/user/pages/CreateUser";
import ListUsers from "@/features/user/pages/ListUsers";

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

         { path: "ordens", element: <ListOrders /> },
         { path: "ordens/info/:id", element: <ViewOrder /> },
         
         { path: "clientes", element: <ListCustomers /> },
         { path: "clientes/form", element: <CreateCustomer /> },
         { path: "clientes/form/:id", element: <CreateCustomer /> },
         { path: "clientes/info/:id", element: <ViewCustomer /> },

         { path: "usuarios", element: <ListUsers /> },
         { path: "usuarios/form", element: <CreateUser /> },
         { path: "usuarios/form/:id", element: <CreateUser /> },

         { path: "etapas", element: <ListAssociates /> }
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
