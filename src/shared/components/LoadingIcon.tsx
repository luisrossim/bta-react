import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface LoadingIconProps {
   size?: number
   className?: string
}

export function LoadingIcon({ 
   size = 22, 
   className = "text-blue-500"
}: LoadingIconProps) {
   return (
      <Loader 
         size={size} 
         className={cn('animate-spin m-auto', className)} 
      />
   )
}