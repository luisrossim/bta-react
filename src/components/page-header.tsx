import type { ReactNode } from "react"

export const PageTitle = ({ title }: { title: string }) => {
   return <h1 className="text-3xl font-semibold">{title}</h1>
}

export const PageSubtitle = ({ subtitle }: { subtitle: string }) => {
   return <h2 className="text-neutral-600">{subtitle}</h2>
}

interface PageHeaderProps {
   title: string
   subtitle: string
   action?: ReactNode
}

export const PageHeader = ({ title, subtitle, action }: PageHeaderProps) => {
   return (
      <div className="flex flex-wrap justify-between items-center gap-8">
         <div className="space-y-1">
            <PageTitle title={title} />
            <PageSubtitle subtitle={subtitle} />
         </div>

         {action}
      </div>
   )
}