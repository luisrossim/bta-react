import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface FormFieldWrapperProps {
   colSpan?: number
   children: ReactNode
   className?: string
}

export const FormFieldWrapper = ({ colSpan = 1, className, children }: FormFieldWrapperProps) => {
   const colSpanClass: Record<number, string> = {
      1: 'lg:col-span-1',
      2: 'lg:col-span-2',
      3: 'lg:col-span-3'
   }

   return (
      <div className={cn(`grid gap-2 ${colSpanClass[colSpan]}`, className)}>
         {children}
      </div>
   )
}