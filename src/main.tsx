import { QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './features/auth/contexts/AuthContext';
import './index.css';
import { queryClient } from './lib/reactQuery';
import router from './routes/routes';

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>

        <Toaster />
    </QueryClientProvider>
);
