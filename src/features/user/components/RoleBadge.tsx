import type { Roles } from "@/features/user/types/Role";

interface RoleBadgeProps {
   rounded: boolean
   role: Roles
}

export const RoleBadge = ({ rounded, role }: RoleBadgeProps) => {
   const roundedSize = rounded == true ? 'rounded-full' : 'rounded-sm';
   const backgroundMap: Record<'Admin' | 'Técnico' | 'Assistente', string> = {
      'Admin': 'bg-red-600 text-orange-100',
      'Técnico': 'bg-sky-600 text-sky-100',
      'Assistente': 'bg-emerald-600 text-green-100',
   }

   return (
      <div className={`px-2 py-1 inline-block text-xs font-medium ${roundedSize} ${backgroundMap[role]}`}>
         {role}
      </div>
   )
}