import { cn } from "@/lib/utils"

interface ListItemProps {
   label: string
   value: any
   className?: string
}

export function ListItem({ label, value, className }: ListItemProps) {
   return (
      <div className={cn("flex flex-col gap-1 text-sm", className)}>
         <h2 className="text-muted-foreground">
            <p>{label}</p>
         </h2>

         {value 
            ? <div className="font-medium">{value}</div>
            : <p className="font-light text-muted-foreground">Nada informado</p>
         }
      </div>
   )
}