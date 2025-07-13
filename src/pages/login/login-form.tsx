import { HelperText } from "@/components/helper-text";
import { LoadingIcon } from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/use-auth";
import { authRequestSchema, type AuthRequest, type AuthUser } from "@/models/auth";
import { authService } from "@/services/auth-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
   setError: (message: string | null) => void;
}

export function LoginForm({ setError }: LoginFormProps) {
   const navigate = useNavigate();
   const { setAuthOnLocalStorage } = useAuth();
   const [ loading, setLoading ] = useState<boolean>(false);
   const { register, handleSubmit, formState:{ errors } } = useForm<AuthRequest>({
      resolver: zodResolver(authRequestSchema)
   })


   const authenticate = async (data: AuthRequest) => {
      setLoading(true);
      setError(null);

      try {
         const res = await authService.authenticate(data);
         actionsForSuccess(res);
      } catch (err: any) {
         const message = err?.response?.data?.message || err?.message || "Erro ao autenticar.";
         setError(message);
      } finally {
         setLoading(false);
      }
   };


   function actionsForSuccess(user: AuthUser) {
      setAuthOnLocalStorage(user);
      navigate("/sistema", { replace: true });
   }


   return (
      <form onSubmit={handleSubmit(authenticate)}>
         <div className="grid gap-6 py-2 pb-6">
            <div className="grid gap-2">
               <Label htmlFor="login">Email</Label>
               <Input
                  id="login"
                  placeholder="seunome@empresa.com.br"
                  className={`${errors.login && "border-red-500"}`}
                  {...register("login")}
               />
               { errors.login && 
                  <HelperText variant="invalid" message={errors.login.message || "E-mail inválido"} /> 
               }
            </div>

            <div className="grid gap-2">
               <Label htmlFor="password">Senha</Label>
               <Input 
                  id="password" 
                  type="password"
                  className={`${errors.password && "border-red-500"}`}
                  {...register("password")} 
               />
               { errors.password && 
                  <HelperText variant="invalid" message={errors.password.message || "Senha inválida"} /> 
               }
            </div>
         </div>

         <Button type="submit" className="w-full h-10">
            {loading ? <LoadingIcon variant="cyan" /> : "Acessar"}
         </Button>
      </form>
   );
}
