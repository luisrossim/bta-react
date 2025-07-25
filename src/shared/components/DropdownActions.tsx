import { EllipsisVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DropdownActionsProps {
   actions: Array<{ 
      label: string, 
      onClick: () => void 
   }>
}

export function DropdownActions({ actions }: DropdownActionsProps) {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger className="!cursor-pointer p-1">
            <EllipsisVertical size={16} className="text-slate-600" />
         </DropdownMenuTrigger>

         <DropdownMenuContent>
            {actions.map((action, index) => (
               <DropdownMenuItem 
                  key={index}
                  onClick={action.onClick}
                  className="cursor-pointer"
               >
                  {action.label}
               </DropdownMenuItem>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   )
}