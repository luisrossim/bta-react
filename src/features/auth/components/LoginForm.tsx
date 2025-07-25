import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { InputFormItem } from "@/shared/components/InputFormItem";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../hooks/useLoginMutation";
import { showError } from "@/shared/utils/showMessage";
import { authRequestSchema, type AuthRequest, type AuthUser } from "../types/Auth";

export function LoginForm() {
   const navigate = useNavigate();
   const { mutateAsync: authenticate, isPending } = useLoginMutation();

   const form = useForm<AuthRequest>({
      resolver: zodResolver(authRequestSchema)
   })

   const onSubmit = async (values: AuthRequest) => {
      try {
         const response = await authenticate(values);
         actionsForSuccess(response);
      } catch (err: any) {
         showError(err.message);
      }
   };

   function actionsForSuccess(user: AuthUser) {
      localStorage.setItem("@bta:auth", JSON.stringify(user));
      navigate("/sistema", { replace: true });
   }

   return (
      <FormProvider {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6 py-2 pb-6">
               <InputFormItem 
                  label="Email"
                  name="login"
                  placeholder="exemplo@bta.com.br"
               />

               <InputFormItem 
                  label="Senha"
                  name="password"
                  type="password"
               />
            </div>

            <Button 
               type="submit"
               className="w-full"
               disabled={isPending}
            >
               Acessar
            </Button>
         </form>
      </FormProvider>
   );
}
