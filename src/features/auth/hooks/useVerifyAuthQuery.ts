import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

const verifyAccess = async (): Promise<void> => {
   await axiosInstance.get<void>('/auth/me');
}

export const useVerifyAuthQuery = () => {
   return useQuery<void, Error>({
      queryKey: ["verify-auth"],
      queryFn: verifyAccess,
      enabled: false
   });
};