import { cn } from "@/lib/utils"

interface ListItemProps {
   label: string
   value: any
   className?: string
}

export function ListItem({ label, value, className }: ListItemProps) {
   return (
      <div className={cn("flex flex-col gap-1", className)}>
         <h2 className="font-medium text-neutral-500 text-sm">
            {label}
         </h2>
         <p className="font-medium text-sm">{value || ""}</p>
      </div>
   )
}