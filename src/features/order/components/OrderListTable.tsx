import { Badge } from '@/components/ui/badge';
import { LoadingIcon } from '@/shared/components/LoadingIcon';
import {
    GenericTable,
    type Column,
} from '@/shared/components/table-components/GenericTable';
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import { formatTimestamp } from '@/shared/utils/formatDate';
import { useNavigate } from 'react-router-dom';
import { useCalculateExecutionTime } from '../hooks/useCalculateExecutionTime';
import type { OrderPaginated } from '../types/OrderPaginated';
import { UserAssignedTooltip } from './UserAssignedTooltip';

interface OrderListTableProps {
    data: OrderPaginated[];
    isFetching: boolean;
}

export function OrderListTable({ data, isFetching }: OrderListTableProps) {
    const { calculateExecutionTime } = useCalculateExecutionTime();
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    const handleCustomerName = (name: string) => {
        return name.length > 28 && isMobile ? name.slice(0, 28) : name;
    };

    if (isFetching) return <LoadingIcon />;

    const columns: Column<OrderPaginated>[] = [
        {
            header: 'N°',
            render: (order) => (
                <span className='text-primary text-sm'>{order.numero}</span>
            ),
        },
        {
            header: 'Cliente',
            render: (order) => (
                <span>{handleCustomerName(order.cliente_nome)}</span>
            ),
        },
        {
            header: 'Etapa atual',
            render: (order) => (
                <span className='text-primary font-medium'>
                    {order.etapa_descricao}
                </span>
            ),
        },
        {
            header: 'Atribuídos',
            render: (order) => (
                <>
                    {order.usuarios_atribuidos.map((atribuicao, index) => (
                        <UserAssignedTooltip
                            key={index}
                            name={atribuicao.nome}
                        />
                    ))}
                </>
            ),
        },
        {
            header: 'Situação',
            render: (order) => (
                <>
                    {order.historico_concluido_em ? (
                        <Badge variant={'success'}>Concluída</Badge>
                    ) : (
                        <Badge variant={'warning'}>Em andamento</Badge>
                    )}
                </>
            ),
        },
        {
            header: 'Tempo de execução',
            render: (order) => (
                <span>
                    {calculateExecutionTime(
                        order.historico_criado_em,
                        order.historico_concluido_em
                    )}
                </span>
            ),
        },
        {
            header: 'Criado em',
            render: (order) => (
                <span className='text-muted-foreground'>
                    {formatTimestamp(order.criado_em)}
                </span>
            ),
        },
    ];

    return (
        <GenericTable
            data={data}
            columns={columns}
            actions={(order) => [
                {
                    label: 'Visualizar',
                    onClick: () => navigate(`/sistema/ordens/${order.id}`),
                },
            ]}
        />
    );
}
