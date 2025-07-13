import type { Stage } from "@/models/stage"

interface StageHeaderProps {
   stage: Stage
}

export const StageHeader = ({ stage }: StageHeaderProps) => {
   return (
      <div className="flex items-center gap-4 font-medium bg-primary/70 text-white px-3 py-1">
         <p>{stage.id}</p>
         <p>{stage.descricao}</p>
      </div>
   )
}