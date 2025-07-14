import { createBrowserRouter, redirect } from "react-router-dom";
import NotFoundPage from "@/pages/notfound";
import ServiceOrderPage from "@/pages/order";
import MainLayout from "@/components/layout";
import LoginPage from "@/pages/login";
import CustomerPage from "@/pages/customer";
import UserPage from "@/pages/user";
import UserFormPage from "@/pages/user/UserFormPage";
import CustomerFormPage from "@/pages/customer/CustomerFormPage";
import StagePage from "@/pages/stages";
import CustomerInfoPage from "@/pages/customer/CustomerInfoPage";
import MaterialsPage from "@/pages/materials";
import ServiceOrderInfoPage from "@/pages/order/OrderInfoPage";

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

         { path: "etapas", element: <StagePage /> },
         { path: "materiais", element: <MaterialsPage /> }
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
