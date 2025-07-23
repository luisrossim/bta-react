import { cn } from "@/lib/utils"

interface ListItemProps {
   label: string
   value: any
   className?: string
}

export function ListItem({ label, value, className }: ListItemProps) {
   return (
      <div className={cn("flex flex-col gap-1", className)}>
         <h2 className="text-muted-foreground text-sm">
            <p>{label}</p>
         </h2>
         {value && <div className="font-medium">{value}</div>}
      </div>
   )
}