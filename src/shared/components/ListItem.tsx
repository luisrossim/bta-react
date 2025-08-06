import { cn } from "@/lib/utils"

interface ListItemProps {
   label: string
   value: any
   className?: string
}

export function ListItem({ label, value, className }: ListItemProps) {
   return (
      <div className={cn("flex flex-col gap-1 text-sm", className)}>
         <h2 className="text-black font-medium">
            {label}
         </h2>

         {value 
            ? <div>{value}</div>
            : <p className="font-light text-muted-foreground">-</p>
         }
      </div>
   )
}