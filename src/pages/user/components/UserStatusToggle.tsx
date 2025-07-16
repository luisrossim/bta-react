import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import type { User } from "@/models/user"
import { ConfirmDialog } from "@/shared/components/ConfirmDialog"

interface UserStatusToggleProps {
   user: User
   onToggle: (userId: number) => void
   disableActions: boolean
}

export function UserStatusToggle({ user, onToggle, disableActions }: UserStatusToggleProps) {
   const actionTitle = user.isAtivo ? "Desativar usuário" : "Ativar usuário";

   return (
      <ConfirmDialog
         onConfirm={() => onToggle(user.id)}
         disabled={disableActions}
         title={actionTitle}
         description={`Deseja alterar o status de acesso do usuário "${user.nome}"?`}
         trigger={
            <Switch 
               className={cn(user.isAtivo ? "bg-green-500" : "bg-neutral-300")} 
               checked={user.isAtivo} 
            />
         }
      />
   )
}