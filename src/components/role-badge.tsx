import type { Roles } from "@/models/role";

interface RoleBadgeProps {
   rounded: boolean
   role: Roles
}

export const RoleBadge = ({ rounded, role }: RoleBadgeProps) => {
   const roundedSize = rounded == true ? 'rounded-full' : 'rounded-sm';
   const backgroundMap: Record<'Admin' | 'Técnico' | 'Assistente', string> = {
      'Admin': 'bg-red-100 text-red-800',
      'Técnico': 'bg-emerald-100 text-emerald-800',
      'Assistente': 'bg-slate-100 text-slate-800',
   }

   return (
      <div className={`px-2 py-1 inline-block text-xs ${roundedSize} ${backgroundMap[role]}`}>
         <p>{role}</p>
      </div>
   )
}