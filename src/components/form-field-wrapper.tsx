import type { ReactNode } from "react";

interface FormFieldWrapperProps {
   colSpan?: number
   children: ReactNode 
}

export const FormFieldWrapper = ({ colSpan = 1, children }: FormFieldWrapperProps) => {
   const colSpanClass: Record<number, string> = {
      1: 'lg:col-span-1',
      2: 'lg:col-span-2',
      3: 'lg:col-span-3'
   }

   return (
      <div className={`grid gap-2 ${colSpanClass[colSpan]}`}>
         {children}
      </div>
   )
}