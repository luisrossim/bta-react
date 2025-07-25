import { StrictMode } from "react";
import "./index.css";
import router from "./routes/routes";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from "./lib/react-query";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./features/auth/contexts/AuthContext";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
            <Toaster richColors />
        </QueryClientProvider>
    </StrictMode>
);
