import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
   return (
      <form className="flex flex-col gap-6">
         <div className="flex flex-col items-start gap-2">
            <h1 className="text-4xl md:text-5xl font-semibold">Acessar</h1>
            <p className="font-light">Informe suas credenciais de acesso:</p>
         </div>

         <div className="grid gap-5 py-5">
            <div className="grid gap-2">
               <Label htmlFor="email">Email</Label>
               <Input
                  id="email"
                  type="email"
                  placeholder="bta@exemplo.com"
                  required
               />
            </div>
            <div className="grid gap-2">
               <Label htmlFor="password">Senha</Label>
               <Input id="password" type="password" required />
            </div>
         </div>

         <Button type="submit" size={"lg"} className="w-full">
            Acessar
         </Button>
      </form>
   );
}
