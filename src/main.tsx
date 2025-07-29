import { StrictMode } from "react";
import "./index.css";
import router from "./routes/routes";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from "./lib/reactQuery";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./features/auth/contexts/AuthContext";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <div className="relative">
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
                <div className="absolute bottom-0 p-1 text-center text-xs md:text-sm w-full bg-amber-400">
                    Esta é uma versão de teste, haverá carregamentos inicias longos e perca de dados
                </div>
            </div>
            <Toaster richColors />
        </QueryClientProvider>
    </StrictMode>
);
