import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import type { User } from "@/models/user";

interface UserAssignedTooltipProps {
   user: User;
}

export function UserAssignedTooltip({ user }: UserAssignedTooltipProps) {
   const IsMobile = useIsMobile();

   if (IsMobile) {
      return (
         <span
            className="inline-flex items-center hover:cursor-default justify-center bg-primary text-white rounded-full mr-1 text-xs px-2 py-1 font-semibold"
         >
            {user.nome}
         </span>
      )
   }

   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <span
               className="inline-flex items-center hover:cursor-default justify-center bg-primary text-white rounded-full w-6 h-6 mr-1 text-xs font-semibold"
            >
               {user.nome.charAt(0)?.toUpperCase()}
            </span>
         </TooltipTrigger>
         <TooltipContent>
            <p>
               {user.nome}
            </p>
         </TooltipContent>
      </Tooltip>
   )
}