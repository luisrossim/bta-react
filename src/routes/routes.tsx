import { createBrowserRouter, redirect } from "react-router-dom";
import NotFoundPage from "@/pages/notfound";
import ServiceOrderPage from "@/pages/service-order";
import MainLayout from "@/components/layout";
import LoginPage from "@/pages/login";
import CustomerPage from "@/pages/customer";
import UserPage from "@/pages/user";
import UserFormPage from "@/pages/user/user-form";
import CustomerFormPage from "@/pages/customer/customer-form";
import StagePage from "@/pages/stages";
import CustomerInfoPage from "@/pages/customer/customer-info";
import DashboardPage from "@/pages/dashboard";
import MaterialsPage from "@/pages/materials";
import ServiceOrderFormPage from "@/pages/service-order/service-order-form";
import ServiceOrderInfoPage from "@/pages/service-order/service-order-info";

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
      element: <MainLayout />
      ,
      children: [
         { path: "", element: <DashboardPage /> },

         { path: "ordens", element: <ServiceOrderPage /> },
         { path: "ordens/form", element: <ServiceOrderFormPage /> },
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
