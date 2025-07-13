interface UserBadgeStatusProps {
   isAtivo: boolean
}

export const UserStatusIcon = ({ isAtivo }: UserBadgeStatusProps) => {
   const classes = isAtivo ? "bg-green-100 text-emerald-700" : "bg-neutral-100 text-neutral-700"
   const label = isAtivo ? "Ativo" : "Inativo"

   return (
      <p className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${classes}`}>
         {label}
      </p>
   )
}