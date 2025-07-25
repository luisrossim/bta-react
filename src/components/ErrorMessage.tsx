import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface ErrorMessageProps {
   message?: string
}

export function ErrorMessage({ 
   message = "Erro desconhecido" 
}: ErrorMessageProps) {
   return (
      <Card className="rounded-[6px] shadow-none border-none bg-red-100">
         <CardContent>
            <CardDescription className="flex flex-col md:flex-row item-center gap-2 text-red-700">
               <AlertCircle size={18} /> {message}
            </CardDescription>
         </CardContent>
      </Card>
   )
}