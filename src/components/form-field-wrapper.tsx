import type { ReactNode } from "react";

interface FormFieldWrapperProps {
   colSpan?: number
   children: ReactNode 
}

export const FormFieldWrapper = ({ colSpan = 1, children }: FormFieldWrapperProps) => {
   const colSpanClass: Record<number, string> = {
      1: 'col-span-1',
      2: 'col-span-2',
      3: 'col-span-3'
   }

   return (
      <div className={`grid gap-2 ${colSpanClass[colSpan]}`}>
         {children}
      </div>
   )
}