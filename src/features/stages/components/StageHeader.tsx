import type { Stage } from '@/features/stages/types/Stage';

interface StageHeaderProps {
    stage: Stage;
}

export const StageHeader = ({ stage }: StageHeaderProps) => {
    return (
        <div className='flex gap-3 items-center'>
            <p className='flex items-center justify-center w-[24px] h-[24px] bg-primary text-white rounded-full text-sm'>
                {stage.id}
            </p>
            <p className='text-sm'>{stage.descricao}</p>
        </div>
    );
};
