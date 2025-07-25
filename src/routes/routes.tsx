import { createBrowserRouter, redirect } from "react-router-dom";
import NotFoundPage from "@/features/notfound";
import ServiceOrderPage from "@/features/order";
import MainLayout from "@/components/layout";
import CustomerPage from "@/features/customer";
import UserPage from "@/features/user";
import UserFormPage from "@/features/user/UserFormPage";
import CustomerFormPage from "@/features/customer/CustomerFormPage";
import StagePage from "@/features/stages";
import CustomerInfoPage from "@/features/customer/CustomerInfoPage";
import ServiceOrderInfoPage from "@/features/order/OrderInfoPage";
import Login from "@/features/auth/pages/Login";

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
      element: <MainLayout />,
      children: [
         { path: "", loader: () => redirect("ordens") },

         { path: "ordens", element: <ServiceOrderPage /> },
         { path: "ordens/info/:id", element: <ServiceOrderInfoPage /> },
         
         { path: "clientes", element: <CustomerPage /> },
         { path: "clientes/form", element: <CustomerFormPage /> },
         { path: "clientes/form/:id", element: <CustomerFormPage /> },
         { path: "clientes/info/:id", element: <CustomerInfoPage /> },

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
