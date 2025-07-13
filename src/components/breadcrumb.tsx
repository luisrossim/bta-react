import { Link } from "react-router-dom"

export interface PreviousUrl {
   label: string
   redirectTo: string
}

interface BreadcrumbProps {
   current: string
   previous: PreviousUrl[]
}

export const Breadcrumb = ({ current, previous }: BreadcrumbProps) => {
   return (
      <div className="flex items-center text-primary mb-8 gap-2 text-sm">
         {previous.map((p, index) => (
            <div key={index} className="flex items-center gap-2 text-neutral-500">
               <Link key={index} to={p.redirectTo} className="hover:underline">
                  {p.label}
               </Link>
               <span>/</span>
            </div>
         ))}
         <p className="text-primary font-medium">{current}</p>
      </div>
   )
}