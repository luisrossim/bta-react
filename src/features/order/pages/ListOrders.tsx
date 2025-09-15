import { OrderFilter } from '@/features/order/components/OrderFilter';
import { PageHeader } from '@/shared/components/PageHeader';
import {
    GenericTable,
    type Column,
} from '@/shared/components/table-components/GenericTable';
import { PaginationFooter } from '@/shared/components/table-components/PaginationFooter';
import { TruncateCell } from '@/shared/components/table-components/TruncateCell';
import { cleanObject } from '@/shared/utils/cleanObject';
import { formatTimestamp } from '@/shared/utils/formatDate';
import { addMonths, startOfMonth, subDays, subMonths } from 'date-fns';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderForm from '../components/OrderForm';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import { UsersAssigned } from '../components/UsersAssigned';
import { useGetOrdersQuery } from '../hooks/useOrderApi';
import { useOrderDetails } from '../hooks/useOrderDetails';
import type { OrderFilters } from '../types/OrderFilters';
import type { OrderPaginated } from '../types/OrderPaginated';

export default function ListOrders() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const { calculateExecutionTime } = useOrderDetails();

    const [filters, setFilters] = useState<OrderFilters>({
        startDate: startOfMonth(subMonths(new Date(), 6)),
        endDate: subDays(startOfMonth(addMonths(new Date(), 1)), 1),
    });

    const { data: result, isFetching } = useGetOrdersQuery(page, filters);

    function onFilter(values: OrderFilters) {
        setPage(1);
        setFilters(cleanObject(values));
    }

    const columns: Column<OrderPaginated>[] = [
        {
            header: 'N°',
            render: (order) => (
                <span className='text-primary'>{order.numero}</span>
            ),
        },
        {
            header: 'Cliente',
            render: (order) => <TruncateCell text={order.cliente_nome} />,
        },
        {
            header: 'Etapa atual',
            render: (order) => (
                <span className='text-primary'>{order.etapa_descricao}</span>
            ),
        },
        {
            header: 'Atribuídos',
            render: (order) => (
                <UsersAssigned users={order.usuarios_atribuidos} />
            ),
        },
        {
            header: 'Situação',
            render: (order) => (
                <OrderStatusBadge
                    completedDate={order.historico_concluido_em}
                />
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
            render: (order) => <span>{formatTimestamp(order.criado_em)}</span>,
        },
    ];

    return (
        <div className='space-y-14'>
            <PageHeader
                title='Ordens de serviço'
                subtitle='Acompanhe o progresso das ordens de serviço da empresa.'
                action={<OrderForm />}
            />

            <div className='grid grid-cols-1 gap-8'>
                <OrderFilter onSubmit={onFilter} />

                <GenericTable
                    data={result?.data}
                    columns={columns}
                    loading={isFetching}
                    actions={(order) => [
                        {
                            label: 'Visualizar',
                            onClick: () =>
                                navigate(`/sistema/ordens/${order.id}`),
                        },
                    ]}
                />

                {result && result.data.length > 0 && (
                    <PaginationFooter
                        page={result.page}
                        totalItems={result.totalItems}
                        totalPages={result.totalPages}
                        onPageChange={setPage}
                    />
                )}
            </div>
        </div>
    );
}
