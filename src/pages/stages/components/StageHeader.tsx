import type { Stage } from "@/models/stage"

interface StageHeaderProps {
   stage: Stage
}

export const StageHeader = ({ stage }: StageHeaderProps) => {
   return (
      <div className="flex gap-3 items-center text-primary font-medium">
         <p className="flex items-center justify-center bg-primary text-white w-[28px] h-[28px] rounded-full">
            {stage.id}
         </p>
         <p className="text-base">
            {stage.descricao}
         </p>
      </div>
   )
}