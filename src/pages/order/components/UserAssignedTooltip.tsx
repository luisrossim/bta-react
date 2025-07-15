import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import type { User } from "@/models/user";

interface UserAssignedTooltipProps {
   userAssigned: User;
   fullName?: boolean;
}

export function UserAssignedTooltip({ userAssigned, fullName = false }: UserAssignedTooltipProps) {
   const IsMobile = useIsMobile();

   if (IsMobile && fullName) {
      return (
         <span
            className="inline-flex items-center hover:cursor-default justify-center bg-neutral-200 text-neutral-700 rounded-full mr-1 text-xs px-2 py-1 font-semibold"
         >
            {userAssigned.nome}
         </span>
      )
   }

   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <span
               className="inline-flex items-center hover:cursor-default justify-center bg-neutral-200 text-neutral-700 rounded-full w-6 h-6 mr-1 text-xs font-semibold"
            >
               {userAssigned.nome.charAt(0)?.toUpperCase()}
            </span>
         </TooltipTrigger>
         <TooltipContent>
            <p>
               {userAssigned.nome}
            </p>
         </TooltipContent>
      </Tooltip>
   )
}