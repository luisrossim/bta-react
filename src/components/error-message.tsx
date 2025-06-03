import { X } from "lucide-react"

interface ErrorMessageProps {
   message?: string
}

export const ErrorMessage = ({ message = "Erro" }: ErrorMessageProps) => {
   return (
      <div className="flex flex-wrap items-center text-red-600 gap-2">
         <div>
            <X size={18} />
         </div>

         <p className="text-sm text-wrap">{ message }</p>
      </div>
   )
}