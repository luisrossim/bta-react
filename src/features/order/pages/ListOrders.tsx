import { OrderFilter } from '@/features/order/components/OrderFilter';
import { OrderListTable } from '@/features/order/components/OrderListTable';
import { PageHeader } from '@/shared/components/PageHeader';
import { PaginationFooter } from '@/shared/components/PaginationFooter';
import { useState } from 'react';
import OrderForm from '../components/OrderForm';
import { useGetOrdersQuery } from '../hooks/useOrderApi';
import type { OrderFilters } from '../types/OrderFilters';

export default function ListOrders() {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState<OrderFilters>({});

    const { data: result, isFetching } = useGetOrdersQuery(page, filters);

    function cleanFilters(filters: OrderFilters) {
        return {
            ...(filters.stageId !== -1 && { stageId: filters.stageId }),
            ...(filters.userId !== -1 && { userId: filters.userId }),
            ...(filters.status &&
                filters.status !== 'todas' && { status: filters.status }),
        };
    }

    function onFilter(values: OrderFilters) {
        setPage(1);
        setFilters(cleanFilters(values));
    }

    return (
        <div className='space-y-14'>
            <PageHeader
                title='Ordens de serviço'
                subtitle='Acompanhe o progresso das ordens de serviço da empresa.'
                action={<OrderForm />}
            />

            <div className='grid grid-cols-1 gap-8'>
                <OrderFilter onSubmit={onFilter} />

                <OrderListTable
                    data={result?.data ?? []}
                    isFetching={isFetching}
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
