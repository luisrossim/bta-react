import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"

interface PageHeaderProps {
   title: string
   subtitle: string
   redirectTo?: string
   redirectLabel?: string
   children: ReactNode
}

export const PageHeader = ({ title, subtitle, redirectTo, redirectLabel, children }: PageHeaderProps) => {
   return (
      <div className="grid grid-cols-1 gap-8">
         <div className="flex flex-wrap justify-between gap-6 items-end">
            <div>
               <PageTitle title={title} />
               <PageSubtitle subtitle={subtitle} />
            </div>

            {redirectTo && (
               <Link to={redirectTo}>
                  <Button><Plus /> {redirectLabel}</Button>
               </Link>
            )}
         </div>

         {children}
      </div>
   )
}

export const PageTitle = ({ title }: { title: string }) => {
   return <h1 className="text-2xl font-semibold mb-1">{title}</h1>
}

export const PageSubtitle = ({ subtitle }: { subtitle: string }) => {
   return <h2 className="text-sm text-slate-600">{subtitle}</h2>
}