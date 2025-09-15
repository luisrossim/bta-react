import type { AuthRequest, AuthUser } from '@/features/auth/types/Auth';
import { axiosInstance } from '@/lib/axios';

export async function authenticate(data: AuthRequest): Promise<AuthUser> {
    const response = await axiosInstance.post<AuthUser>('/auth/login', data);
    return response.data;
}

export async function verify(): Promise<string> {
    const response = await axiosInstance.get<string>('/auth/me');
    return response.statusText;
}

export async function logout(): Promise<void> {
    await axiosInstance.post<void>('/auth/logout');
}
