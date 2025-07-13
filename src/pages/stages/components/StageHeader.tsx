import type { Stage } from "@/models/stage"

interface StageHeaderProps {
   stage: Stage
}

export const StageHeader = ({ stage }: StageHeaderProps) => {
   return (
      <div className="flex items-center gap-3 mb-3">
         <div className="flex w-[28px] h-[28px] justify-center items-center rounded-full bg-primary">
            <span className="text-white text-sm font-medium">
               {stage.id}
            </span>
         </div>
         <p className="text-primary font-semibold">
            {stage.descricao}
         </p>
      </div>
   )
}