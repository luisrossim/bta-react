import { OrderFilter } from "@/features/order/components/OrderFilter";
import { OrderListTable } from "@/features/order/components/OrderListTable";
import { PaginationFooter } from "@/shared/components/PaginationFooter";
import { PageHeader } from "@/shared/components/PageHeader";
import { useGetOrdersQuery } from "../hooks/useOrderApi";
import type { OrderFilters } from "../types/OrderFilters";
import OrderForm from "../components/OrderForm";
import { useState, useEffect } from "react";

export default function ListOrders() {
    const [page, setPage] = useState(1);
    const [rawFilters, setRawFilters] = useState<OrderFilters>({});
    const [filters, setFilters] = useState<OrderFilters>({});

    const { data: result, isFetching } = useGetOrdersQuery(page, filters);

    function cleanFilters(filters: OrderFilters) {
        return {
            ...(filters.stageId !== -1 && { stageId: filters.stageId }),
            ...(filters.userId !== -1 && { userId: filters.userId }),
            ...(filters.status && filters.status !== "todas" && { status: filters.status }),
        };
    }

    function onFilter(newFilters: OrderFilters) {
        setRawFilters(newFilters);
    }

    useEffect(() => {
        setFilters(cleanFilters(rawFilters));
    }, [rawFilters]);

    useEffect(() => {
        setPage(1);
    }, [filters]);

    return (
        <div className="space-y-14">
            <PageHeader 
                title="Ordens de serviço"
                subtitle="Acompanhe o progresso das ordens de serviço da empresa."
                action={<OrderForm />}
            />

            <div className="grid grid-cols-1 gap-8">
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
