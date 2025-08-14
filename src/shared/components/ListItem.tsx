import { cn } from "@/lib/utils"

interface ListItemProps {
   label: string
   value: any
   className?: string
}

export function ListItem({ label, value, className }: ListItemProps) {
   return (
      <div className={cn("flex flex-col gap-1 text-sm", className)}>
         <h2 className="font-semibold">
            {label}
         </h2>

         {value 
            ? <div>{value}</div>
            : <p>-</p>
         }
      </div>
   )
}