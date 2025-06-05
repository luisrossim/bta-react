import type { Roles } from "@/models/role";

interface RoleBadgeProps {
   rounded: boolean
   role: Roles
}

export const RoleBadge = ({ rounded, role }: RoleBadgeProps) => {
   const roundedSize = rounded == true ? 'rounded-full' : 'rounded-sm';
   const backgroundMap: Record<'Admin' | 'Técnico' | 'Assistente', string> = {
      'Admin': 'bg-rose-100 text-rose-800',
      'Técnico': 'bg-sky-100 text-sky-800',
      'Assistente': 'bg-yellow-100 text-yellow-800',
   }

   return (
      <div className={`px-2 py-1 inline-block text-xs ${roundedSize} ${backgroundMap[role]}`}>
         <p>{role}</p>
      </div>
   )
}