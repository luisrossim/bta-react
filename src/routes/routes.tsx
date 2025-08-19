import AuthGuard from '@/components/layout/AuthGuard';
import MainLayout from '@/components/layout/MainLayout';
import Login from '@/features/auth/pages/Login';
import CreateCustomer from '@/features/customer/pages/CreateCustomer';
import ListCustomers from '@/features/customer/pages/ListCustomers';
import ViewCustomer from '@/features/customer/pages/ViewCustomer';
import ListOrders from '@/features/order/pages/ListOrders';
import ViewOrder from '@/features/order/pages/ViewOrder';
import { ListStages } from '@/features/stages/pages/ListStages';
import CreateUser from '@/features/user/pages/CreateUser';
import ListUsers from '@/features/user/pages/ListUsers';
import NotFoundPage from '@/shared/components/NotFound';
import { createBrowserRouter, redirect } from 'react-router-dom';

const router = createBrowserRouter([
   {
      path: '/',
      loader: () => redirect('/login'),
   },
   {
      path: '/login',
      element: <Login />,
   },
   {
      path: '/sistema',
      element: (
         <AuthGuard>
            <MainLayout />
         </AuthGuard>
      ),
      children: [
         { path: '', loader: () => redirect('ordens') },

         { path: 'ordens', element: <ListOrders /> },
         { path: 'ordens/:id', element: <ViewOrder /> },

         { path: 'clientes', element: <ListCustomers /> },
         { path: 'clientes/form', element: <CreateCustomer /> },
         { path: 'clientes/form/:id', element: <CreateCustomer /> },
         { path: 'clientes/:id', element: <ViewCustomer /> },

         { path: 'usuarios', element: <ListUsers /> },
         { path: 'usuarios/form', element: <CreateUser /> },
         { path: 'usuarios/form/:id', element: <CreateUser /> },

         { path: 'etapas', element: <ListStages /> },
      ],
   },
   {
      path: '404',
      element: <NotFoundPage />,
   },
   {
      path: '*',
      loader: () => redirect('/404'),
   },
]);

export default router;
