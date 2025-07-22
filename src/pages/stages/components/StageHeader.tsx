import type { Stage } from "@/models/stage"

interface StageHeaderProps {
   stage: Stage
}

export const StageHeader = ({ stage }: StageHeaderProps) => {
   return (
      <div className="flex gap-3 items-center text-white">
         <p className="flex items-center justify-center w-[28px] h-[28px] rounded-full">
            {stage.id}
         </p>
         <p className="text-sm">
            {stage.descricao}
         </p>
      </div>
   )
}