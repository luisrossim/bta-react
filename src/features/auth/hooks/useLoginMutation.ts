import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import type { AuthRequest, AuthUser } from "../types/Auth";

const authenticate = async (data: AuthRequest): Promise<AuthUser> => {
  const response = await axiosInstance.post<AuthUser>('/auth/login', data);
  return response.data;
}

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthUser, Error, AuthRequest>({
    mutationFn: authenticate,
    onSuccess: (user) => {
      queryClient.setQueryData(["auth-user"], user);
    }
  });
};
