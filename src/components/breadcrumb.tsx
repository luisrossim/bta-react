import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

interface BreadcrumbProps {
   label: string
   redirectTo: string
}

export const Breadcrumb = ({ label, redirectTo }: BreadcrumbProps) => {
   return (
      <div className="flex items-center text-blue-500 mb-4">
         <ArrowLeft size={16} />
         <Link to={redirectTo} className="text-sm hover:underline hover:cursor-pointer p-1">
            {label}
         </Link>
      </div>
   )
}