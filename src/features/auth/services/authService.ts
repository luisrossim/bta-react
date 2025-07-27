import type { AuthRequest, AuthUser } from "@/features/auth/types/Auth";
import { axiosInstance } from "@/lib/axios";

export async function authenticate(data: AuthRequest): Promise<AuthUser> {
   const response = await axiosInstance.post<AuthUser>('v1/auth/login', data);
   return response.data;
}

export async function verify(): Promise<void> {
   await axiosInstance.get<void>('v1/auth/me');
}

export async function logout(): Promise<void> {
   await axiosInstance.post<void>('v1/auth/logout');
} 