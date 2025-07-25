import type { AxiosInstance } from "axios";
import { axiosInstance } from "./axios";
import type { AuthRequest, AuthUser } from "@/features/login/types/auth";

class AuthService {
   private readonly path = "/v1/auth"
   protected readonly axios: AxiosInstance = axiosInstance; 

   constructor(){}

   async authenticate(data: AuthRequest): Promise<AuthUser> {
      const response = await this.axios.post<AuthUser>(`${this.path}/login`, data);
      return response.data;
   }

   async verifyAccess(): Promise<void> {
      await this.axios.get<void>(`${this.path}/verify`);
   }

   async logout(): Promise<void> {
      await this.axios.post<void>(`${this.path}/logout`);
   } 
}

export const authService = new AuthService;