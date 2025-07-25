import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

const logout = async (): Promise<void> => {
  await axiosInstance.post<void>('/auth/logout');
}

export const useLogoutMutation = () => {
   const queryClient = useQueryClient();

   return useMutation<void, Error, void>({
         mutationFn: logout,
         onSuccess: () => {
            queryClient.removeQueries({ queryKey: ["auth-user"] });
         },
   });
};
