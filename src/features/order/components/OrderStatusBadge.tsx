import { Badge } from '@/components/ui/badge';

interface OrderStatusBadgeProps {
    completedDate?: Date;
}

export function OrderStatusBadge({ completedDate }: OrderStatusBadgeProps) {
    const status = completedDate ? 'completed' : 'progress';

    const statusMap = {
        completed: {
            variant: 'success' as const,
            label: 'Concluída',
        },
        progress: {
            variant: 'warning' as const,
            label: 'Em andamento',
        },
        cancelled: {
            variant: 'destructive' as const,
            label: 'Cancelada',
        },
    };

    const { variant, label } = statusMap[status];

    return <Badge variant={variant}>{label}</Badge>;
}
