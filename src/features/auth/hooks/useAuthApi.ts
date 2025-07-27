import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AuthRequest, AuthUser } from "../types/Auth";
import { authenticate, logout } from "@/features/auth/services/authService";
import { verify } from "@/features/auth/services/authService";
import { useQuery } from "@tanstack/react-query";

const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthUser, Error, AuthRequest>({
    mutationFn: authenticate,
    onSuccess: (user) => {
      queryClient.setQueryData(["auth"], user);
    }
  });
};

const useLogoutMutation = () => {
   const queryClient = useQueryClient();

   return useMutation<void, Error, void>({
      mutationFn: logout,
      onSuccess: () => {
         queryClient.removeQueries({ queryKey: ["auth"] });
      },
   });
};

const useVerifyAuthQuery = () => {
   return useQuery<void, Error>({
      queryKey: ["me"],
      queryFn: verify,
      enabled: false
   });
};

export {
   useLoginMutation,
   useLogoutMutation,
   useVerifyAuthQuery
}
