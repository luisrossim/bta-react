import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { useIsMobile } from '@/shared/hooks/useIsMobile';

interface UserAssignedTooltipProps {
    name: string;
}

export function UserAssignedTooltip({ name }: UserAssignedTooltipProps) {
    const IsMobile = useIsMobile();

    if (IsMobile) {
        return (
            <span className='inline-flex items-center hover:cursor-default justify-center bg-primary text-white rounded-full mr-1 text-xs px-2 py-1 font-semibold'>
                {name}
            </span>
        );
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <span className='inline-flex items-center hover:cursor-default justify-center bg-primary text-white rounded-full w-6 h-6 mr-1 text-xs font-semibold'>
                    {name.charAt(0)?.toUpperCase()}
                </span>
            </TooltipTrigger>
            <TooltipContent>
                <p>{name}</p>
            </TooltipContent>
        </Tooltip>
    );
}
